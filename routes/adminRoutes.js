const express = require("express");
const admin_route = express();
const session = require('express-session');
const config = require("../config/config")
const auth = require('../middleware/adminAuth');
const multer = require('multer')
const path = require('path')
// const bodyParser = require('bodyparser')

admin_route.use(express.json());
admin_route.use(express.urlencoded({extended: true}));

//session

admin_route.use(session({
    secret: config.sessionSecret,
    resave: false, 
    saveUninitialized: false, 
  }));

  //multer
  const storage = multer.diskStorage({
    destination :(req,file,cb) => {
      cb(null,path.join(__dirname, '../public/assetsbackend/imgs/category'))
    },
    filename : (req, file, cb) => {
      cb(null, Date.now() +'-'+ file.originalname)
    }
  })
  const upload = multer({storage : storage})


  //routes
admin_route.set('view engine', 'ejs');
admin_route.set('views','./views/admin')
  
const bodyParser = require('body-parser');
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true }));
  
const adminController = require("../controllers/admin/adminController");
const categoryController =  require('../controllers/admin/categoryController')
const { isLogIn } = require("../middleware/userAuth");

//routes

admin_route.get('/login',auth.isLogOut,adminController.loadLogin)
admin_route.get('/',auth.isLogIn,adminController.loadDashboard)
admin_route.get('/logout',auth.isLogIn,adminController.logOut)
admin_route.post('/login',adminController.adminLogin)

admin_route.get('/categories',auth.isLogIn,categoryController.loadCategories)
admin_route.post('/categories',upload.single('image'),categoryController.addCategory)
admin_route.get('/categories-edit/:id',categoryController.editCategory)
admin_route.post('/categories-edit/:id',upload.single('image'),categoryController.updateCategory)
admin_route.get('/categories-delete/:id',categoryController.deleteCategory)

module.exports = admin_route;