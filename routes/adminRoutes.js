const express = require("express");
const admin_route = express();
const session = require('express-session');
const config = require("../config/config")
const auth = require('../middleware/adminAuth');
const multer = require('multer')
const path = require('path')
const flash = require('express-flash');

// const bodyParser = require('bodyparser')

admin_route.use(express.json());
admin_route.use(express.urlencoded({extended: true}));

//flash
admin_route.use(flash());


//session

admin_route.use(session({
    secret: config.sessionSecret,
    resave: false, 
    saveUninitialized: false, 
  }));

  //multer
  const categoryStorage = multer.diskStorage({
    destination :(req,file,cb) => {
      cb(null,path.join(__dirname, '../public/assetsbackend/imgs/category'))
    },
    filename : (req, file, cb) => {
      cb(null, Date.now() +'-'+ file.originalname)
    }
  })
  const categoryUpload = multer({storage : categoryStorage})
  
  const productStorage = multer.diskStorage({
    destination :(req,file,cb) => {
      cb(null,path.join(__dirname, '../public/assetsbackend/imgs/products'))
    },
    filename : (req, file, cb) => {
      cb(null, Date.now() +'-'+ file.originalname)
    }
  })
  const productUpload = multer({storage : productStorage})


  //routes
admin_route.set('view engine', 'ejs');
admin_route.set('views','./views/admin')
  
const bodyParser = require('body-parser');
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true }));
  
const adminController = require("../controllers/admin/adminController");
const categoryController =  require('../controllers/admin/categoryController')
const productController =  require('../controllers/admin/productController')
const userManagementController =  require('../controllers/admin/userManagementController')
const { isLogIn } = require("../middleware/userAuth");

//routes

admin_route.get('/login',auth.isLogOut,adminController.loadLogin)
admin_route.get('/',auth.isLogIn,adminController.loadDashboard)
admin_route.get('/logout',auth.isLogIn,adminController.logOut)
admin_route.post('/login',adminController.adminLogin)

admin_route.get('/categories',auth.isLogIn,categoryController.loadCategories)
admin_route.post('/categories',categoryUpload.single('image'),categoryController.addCategory)
admin_route.get('/categories-edit/:id',categoryController.loadEditCategory)
admin_route.post('/categories-edit/:id',categoryUpload.single('image'),categoryController.updateCategory)
admin_route.get('/categories-delete/:id',categoryController.deleteCategory)

admin_route.get('/add-product',productController.loadAddProduct)
admin_route.post('/add-product',productUpload.array('image'),productController.addProduct)
admin_route.get('/products',productController.loadProducts)
admin_route.get('/edit-product/:id',productController.loadEditProduct)
admin_route.post('/edit-product/:id',productUpload.array('image'),productController.editProduct)
admin_route.get('/delete-product/:id',productController.deleteProduct)
admin_route.get('/delete-image/:id/:img',productController.deleteImage)

admin_route.get('/users', userManagementController.loadUsers)
admin_route.get('/edit-user/:id', userManagementController.loadEditUser)
admin_route.post('/edit-user/:id', userManagementController.editUser)
admin_route.get('/block-user/:id', userManagementController.blockOrUnblockUser)

module.exports = admin_route;