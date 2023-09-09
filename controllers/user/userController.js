const User = require('../../model/userModel');
const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');
const Order = require('../../model/orderModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path: '.env'})

// password encryption
const securePassword = async(password) => {
    try {
       const passwordHash = await bcrypt.hash(password,10);

       return passwordHash

    } catch (error) {
        console.log(error.message);
    }
};

//generate otp
const generateOtp = () => {
    return Math.floor(Math.random() * 9000 + 1000);
};

//send mail
const sendMail = async (name, email) => {
    try {
        const otp = generateOtp();
        console.log(otp);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: 'adarshbinomon.3@gmail.com',
            to: email,
            subject: 'OTP || chronocraft',
            text: `Thank you for choosing Chronocraft. Use this otp to finish your signup: ${otp}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email has been sent', info.response);
            }
        });

        return otp;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

//load signup
const loadRegister = async (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
};

//add user
const addUser = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);

        if (userData) {
            const otp = await sendMail(userData.name, userData.email);
            req.session.otp = otp;
            res.render('otpVerify', { message: `OTP sent to ${userData.email}`, userData });
        } else {
            res.render('signup');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
};

//otp verify
const verifyOtp = async (req, res) => {
    try {
        const userData = req.body;
        const enteredOtp = req.body.otp;

        if (req.session.otp == enteredOtp) {
            const sPassword = await securePassword(userData.password);
            const user = new User({
                name: userData.name,
                email: userData.email,
                password: sPassword,
                phoneNumber: userData.phoneNumber,
                isAdmin: 0,
            });
            delete req.session.otp;
            const savedUser = await user.save(); 
            req.session.user_id= user._id;
            req.session.isActive = userData.isActive;
            req.session.user = userData;
            console.log(savedUser);
            res.redirect('/');
        } else {
            res.render('otpVerify', { message: 'OTP verification failed' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
};

//load login

const loadLogin = async (req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}

//user login

const userLogin = async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email: email})
        if(userData){
            const passwordMatch = await bcrypt.compare(password,userData.password)
            if(passwordMatch && userData.isAdmin===0 && userData.isActive ===true){
                req.session.user_id = userData._id;
                req.session.isActive = userData.isActive;
                req.session.user = userData;
                console.log(userData);
                console.log(userData.isActive);
                res.redirect('/');
            }else{
                res.render('login',{message: 'Access to your account is currently  blocked by admin, contact admin for more details'})
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

//user logout
const userLogOut = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
    }
} 

//load home
const loadHome = async (req,res)=>{
    try {
        const categories = await Category.find({isListed: true});
        const products = await Product.find({isListed: true});
        console.log(categories);
        const userData = req.session.user;
        res.render('home',{
            categories: categories ,
            products: products,
            userData: userData
        })
    } catch (error) {
        console.log(error.message);
    }
}

//load product page
const loadProduct =  async (req,res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.render('productDetails',{product: product})
    } catch (error) {
        console.log(error.message);
    }
}

//load category specific products
const loadCategory =async (req,res)=>{
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        const products = await Product.find({category: category.name})
        console.log(products);
        res.render('categoryFind',{products : products})
    } catch (error) {
        console.log(error.message);
    }
}

//load user account page
const loadaccount = async (req,res)=>{
    try {
        const user = await User.findById(req.session.user_id);
        const orders = await Order.find({ customerId: req.session.user_id });
        console.log('user>-----'+user);
        console.log('user.address.length>-----'+user.address.length);
        res.render('userAccount',{user:user,orders: orders})
    } catch (error) {
        console.log(error.message);
    }
}

// load edit address
const loadEditAddress = async (req,res)=>{
    try {
        res.render('editAddress')
    } catch (error) {
        console.log(error.message);
    }
}

// load add address
const loadAddAddress = async (req,res)=>{
    try {
        res.render('addAddress')
    } catch (error) {
        console.log(error.message);
    }
}

//add address
const addAddress =  async (req,res)=>{
    try {
        const address = req.body;
        console.log('ADDADDRESS- address:');
        console.log(address);
        const user = await User.findById(req.session.user_id);
        console.log('ADDADDRESS- user:'+user);

        user.address.push(address);
        await user.save();

        res.redirect('account')

    } catch (error) {
        console.log(error.message);
    }
}

//load about

const loadAbout = async (req,res)=>{
    try {
        res.render('about')
    } catch (error) {
        console.log(error.message);
    }
}




module.exports = {
    loadRegister,
    addUser,
    verifyOtp,
    loadLogin,
    userLogin,
    userLogOut,
    loadHome,
    loadProduct,
    loadCategory,
    loadaccount,
    loadEditAddress,
    loadAddAddress,
    addAddress,
    loadAbout
    
};
