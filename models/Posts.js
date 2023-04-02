const mongoose = require("mongoose");





const Commands = new mongoose.Schema({
    Usercomm: { type: String },
    comm: { type: String },
}, { timestamps: true })


const Posts = new mongoose.Schema({
    userPost: { type: String, required: true },
    usernamePost: { type: String, required: true },
    userprofilePic: { type: String, required: false },
    Pic: { type: String, required: false },
    status: { type: String, required: true },
    likes: { type: Number, required: false ,default:0 },
    // commands: { type: Array ,required: false },
    commands: [Commands],
}, { timestamps: true });

module.exports = mongoose.model('Posts', Posts);