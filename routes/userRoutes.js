const express = require("express");
const user_route = express();
const session = require('express-session');
const config = require("../config/config")
const auth = require('../middleware/userAuth')

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

const userController = require("../controllers/user/userController");


user_route.get('/',userController.loadHome)
user_route.get('/signup',auth.isLogOut,userController.loadRegister)
// user_route.get('/otpverify')
user_route.post('/signup',userController.addUser)
user_route.post('/signup/otpverify', userController.verifyOtp)
user_route.get('/login',auth.isLogOut,userController.loadLogin)
user_route.post('/login',userController.userLogin)
user_route.get('/logout',userController.userLogOut)
user_route.get('/product/:id',userController.loadProduct)
user_route.get('/category/:id',userController.loadCategory)
user_route.get('/cart',auth.isLogIn, userController.loadCart)
user_route.post('/add-to-cart', userController.addToCart)


module.exports = user_route;    