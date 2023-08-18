const express =  require('express');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const multer =  require('multer');
const nocache = require('nocache');
const path = require('path');
const mongoose = require('mongoose');
const { get } = require('http');

const app = express();

//set view engine
// app.set("view engine","ejs")

//routes
const userRoute = require('./routes/userRoutes')
app.use(logger('dev'))
app.use('/',userRoute)

//load assets
app.use('/assets',express.static(path.resolve(__dirname,"public/assets")))

//start server
app.listen(3000,()=>{
    console.log("Server is running in port http://localhost:3000");
})

//connect database

mongoose.connect('mongodb://127.0.0.1:27017/eCommerce')