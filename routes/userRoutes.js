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
const orderController = require("../controllers/user/orderController");


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
user_route.get('/edit-address/:id',auth.isLogIn, userController.loadEditAddress)
user_route.post('/edit-address/',auth.isLogIn, userController.editAddress)
user_route.get('/add-address',auth.isLogIn, userController.loadAddAddress)
user_route.post('/add-address', userController.addAddress)
user_route.post('/reset-password',userController.resetPassword)
user_route.get('/about', userController.loadAbout)
user_route.post('/search',userController.searchResult)


user_route.get('/cart',auth.isLogIn, cartController.loadCart)
user_route.post('/add-to-cart',auth.isLogIn, cartController.addToCart)
user_route.post('/change-quantity', cartController.changeQuantity)
user_route.get('/remove-cart/:id', cartController.deleteCartItem)
user_route.get('/checkout',auth.isLogIn, cartController.loadCheckout)
user_route.post('/apply-coupon', cartController.applyCoupon)

user_route.post('/checkout', orderController.checkout)
user_route.get('/order-details/:id',auth.isLogIn,orderController.loadOrderDetails)
user_route.get('/order-cancel/:id',orderController.cancelOrder)
user_route.post('/verify-payment',orderController.verifyPayment)
user_route.get('/order-success',orderController.orderSuccess)
user_route.post('/return',orderController.returnProduct)





module.exports = user_route;    