const express = require("express");
const app = express();
const path = require("path");



// const socket = require('../socket/index')

app.use(express.static(__dirname + "/public"));

// require("router");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const Userapi = require('../controllers/UserController')

const Password = require('../controllers/password')
const Search = require('../controllers/serach')
const Conversation = require('../controllers/Conversation')
const Massage = require('../controllers/Massage')
const Posts = require('../controllers/Posts')
const ErrorHandler = require('../middleware/errorHandaling')

var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  secret: 'ninja',
}));
var passport = require('passport');
require('../initializers/passport')

var flash = require('connect-flash');
const { http } = require("npmlog");

// AFTER app.use(cookieSession(...))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/api' , Userapi,Password, Search,Conversation,Massage,Posts);
app.use(ErrorHandler)

module.exports = app;
