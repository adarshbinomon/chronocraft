const express = require("express");
const user_route = express();
const session = require('express-session');
const config = require("../config/config")

user_route.use(session({
    secret: config.sessionSecret,
    resave: false, 
    saveUninitialized: false, 
  }));

user_route.set('view engine', 'ejs');
user_route.set('views','./views/user')

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

const userController = require("../controllers/userController");


user_route.get('/signup', userController.loadRegister)
// user_route.get('/otpverify')
user_route.post('/signup', userController.addUser)
user_route.post('/signup/otpverify', userController.verifyOtp)
user_route.get('/login',userController.loadLogin)

module.exports = user_route;   