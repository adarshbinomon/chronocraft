const express =  require('express');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const multer =  require('multer');
const nocache = require('nocache');
const path = require('path');
const mongoose = require('mongoose');
const { get } = require('http');

const app = express();

app.use(nocache());



//routes
const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoutes')
app.use(logger('dev'))
app.use('/',userRoute)
app.use('/admin',adminRoute)

//load assets
app.use('/assets',express.static(path.resolve(__dirname,"public/assets")))
app.use('/assetsbackend',express.static(path.resolve(__dirname,"public/assetsbackend")))

//start server
app.listen(3000,()=>{
    console.log("Server is running in port http://localhost:3000");
})

//connect database

mongoose.connect('mongodb://127.0.0.1:27017/eCommerce')