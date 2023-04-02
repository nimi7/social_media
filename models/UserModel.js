const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {type: String} ,
    last:{type:String},
    email : {type: String},
    pic : {type:String},
    date : {type:Date}
}) 

module.exports = mongoose.model('users' , user);