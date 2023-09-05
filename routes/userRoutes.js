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
const cartController = require("../controllers/user/cartController");


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
user_route.get('/account',auth.isLogIn, userController.loadaccount)
user_route.get('/edit-address',auth.isLogIn, userController.loadEditAddress)
user_route.get('/add-address',auth.isLogIn, userController.loadAddAddress)
user_route.post('/add-address', userController.addAddress)


user_route.get('/cart',auth.isLogIn, cartController.loadCart)
user_route.post('/add-to-cart',auth.isLogIn, cartController.addToCart)
user_route.post('/change-quantity', cartController.changeQuantity)
user_route.get('/remove-cart/:id', cartController.deleteCartItem)
user_route.get('/checkout',auth.isLogIn, cartController.loadCheckout)




module.exports = user_route;    