const express = require("express");
const admin_route = express();
const session = require('express-session');
const config = require("../config/config")
const auth = require('../middleware/adminAuth');

//session

admin_route.use(session({
    secret: config.sessionSecret,
    resave: false, 
    saveUninitialized: false, 
  }));

admin_route.set('view engine', 'ejs');
admin_route.set('views','./views/admin')
  
const bodyParser = require('body-parser');
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true }));
  
const adminController = require("../controllers/admin/adminController");

//routes

admin_route.get('/login',auth.isLogOut,adminController.loadLogin)
admin_route.get('/',auth.isLogIn,adminController.loadDashboard)
admin_route.get('/logout',auth.isLogIn,adminController.logOut)
admin_route.post('/login',adminController.adminLogin)

module.exports = admin_route;