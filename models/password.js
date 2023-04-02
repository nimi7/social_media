const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String,default: ""},
    CoverPic: { type: String, default: "https://pbs.twimg.com/media/D-LEFy9X4AAB0qh.jpg" },
    followers: { type:[String], default: [] },
    followins: { type: [String], default: [] },

});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    })
};

module.exports = mongoose.model('Passwords', userSchema);