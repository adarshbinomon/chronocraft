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
        const userData = await User.findById(req.session.user_id);
        res.render('signup',{
            userData: userData
        });
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
        console.log(req.session.otp);
        console.log(req.session.resendotp);
        console.log('old'+req.session.id);

        console.log(enteredOtp);

        if (req.session.otp == enteredOtp || req.session.resendotp == enteredOtp) {
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
        const userData = await User.findById(req.session.user_id);
        res.render('login',{
            userData: userData
        })
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
                if(req.session.returnTo){
                    res.redirect(req.session.returnTo)
                }else{
                    res.redirect('/')
                }
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
        const userData = await User.findById(req.session.user_id);
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
        const userData = await User.findById(req.session.user_id);
        const product = await Product.findById(id);
        res.render('productDetails',{
            product: product,
            userData: userData})
    } catch (error) {
        console.log(error.message);
    }
}

//load category specific products
const loadCategory =async (req,res)=>{
    try {
        const userData = await User.findById(req.session.user_id);
        const id = req.params.id;
        
        var page = 1;
        if(req.query.page){
            page = req.query.page;
        }
        const limit = 2;

        const category = await Category.findById(id);
        const products = await Product.find({category: category.name})
        .limit(limit * 1)
        .skip((page-1) * limit)
        .exec();
        
        const count = await Product.find({category: category.name}).countDocuments();

        console.log(products);
        res.render('categoryFind',{
            products : products,
            userData : userData,
            totalPages: Math.ceil(count/limit),
            page: page
        })
    } catch (error) {
        console.log(error.message);
    }
}

//load user account page
const loadaccount = async (req,res)=>{
    try {
        const user = req.session.user;
        const orders = await Order.find({ customerId: req.session.user_id });
        console.log('user>-----'+user);
        console.log('user.address.length>-----'+user.address.length);
        res.render('userAccount',{user:user,
            orders: orders,
            userData: user
        })
    } catch (error) {
        console.log(error.message);
    }
}

// load edit address
const loadEditAddress = async (req,res)=>{
    try {
        const addressIndex = req.params.id;
        const userData = await User.findById(req.session.user_id);
        const user = req.session.user;
        const address = user.address[addressIndex]
        console.log('edit address details');
        console.log(address);
        res.render('editAddress',{
            address: address,
            addressIndex: addressIndex,
            userData: userData
        })
    } catch (error) {
        console.log(error.message);
    }
}

// edit address

const editAddress = async (req,res)=>{
    try {
        console.log(req.body);
        const user = await User.findById(req.session.user_id);
        const addressId = req.body.addressId;
        console.log(addressId);
      
        // Use findOneAndUpdate to update the specific address
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: user._id,
            'address._id': addressId
          },
          {
            $set: {
              'address.$.name': req.body.name,
              'address.$.addressLine1': req.body.addressLine1,
              'address.$.addressLine2': req.body.addressLine2,
              'address.$.city': req.body.city,
              'address.$.state': req.body.state,
              'address.$.pinCode': req.body.pinCode,
              'address.$.phone': req.body.phone,
              'address.$.email': req.body.email,
              'address.$.addressType': req.body.addressType
            }
          },
          { new: true } // To return the updated user document
        );
      
        if (updatedUser) {
          console.log('User address updated:', updatedUser);
          res.redirect('/account')
        } else {
          console.log('Address not found or user not found.');
          
        }

      } catch (error) {
        console.log(error.message);
      }
      

}

// load add address
const loadAddAddress = async (req,res)=>{
    try {
        const userData = await User.findById(req.session.user_id)
        res.render('addAddress',{userData: userData})
    } catch (error) {
        console.log(error.message);
    }
}

//add address
const addAddress =  async (req,res)=>{
    try {
        const address = {
            name : req.body.name,
            addressLine1 : req.body.addressLine1,
            addressLine2 : req.body.addressLine2,
            city : req.body.city,
            state : req.body.state,
            pinCode : req.body.pinCode,
            phone : req.body.phone,
            email : req.body.email,
            addressType : req.body.addressType


        }
        // console.log('ADDADDRESS- address:');
        console.log(address);
        const user = await User.findById(req.session.user_id);
        // console.log('ADDADDRESS- user:'+user);

        user.address.push(address);
        await user.save();

        if(req.session.returnTo1){
        res.redirect(req.session.returnTo1)
        }else{
        res.redirect('account')
}


    } catch (error) {
        console.log(error.message);
    }
}

//reset password

const resetPassword = async (req,res)=>{
    try {
        const password = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const user = await User.findById(req.session.user_id);
        const passwordMatch = await bcrypt.compare(password,user.password)

        if(passwordMatch){
            const sPassword = await securePassword(newPassword);

            await User.updateOne({_id: req.session.user_id},{password: sPassword})
            res.status(200).json({success: true})
        }else{
            console.log('wrong password');
            res.status(200).json({success: false});
        }

    } catch (error) {
     console.log(error.message);   
    }

}

//load about

const loadAbout = async (req,res)=>{

    try {
        const userData = await User.findById(req.session.user_id)
        res.render('about',{userData: userData})
    } catch (error) {
        console.log(error.message);
    }
}

//search

const searchResult = async (req,res)=>{
    try {
        console.log(req.body);
        const userData = await User.findById(req.session.user_id);
        const search = req.body.search;

        var page = 1;
        if(req.query.page){
            page = req.query.page;
        }
        const limit = 3;



        const result = await Product.find({
            $or:
            [
                {productName: { $regex: search, $options: "i"}},
                {category: { $regex: search, $options: "i"}}
            ]
        })
        .limit(limit * 1)
        .skip((page-1) * limit)
        .exec();
        
        const count = await Product.find({
            $or:
            [
                {productName: { $regex: search, $options: "i"}},
                {category: { $regex: search, $options: "i"}}
            ]
        })
        .countDocuments();
        console.log(count);
        console.log(Math.ceil(count/limit));
        console.log(page);

        console.log(result);
        res.render('categoryFind',{
            products : result,
            userData : userData,
            totalPages: Math.ceil(count/limit),
            page: page
        })    
        
    } catch (error) {
        console.log(error.message)
    }
}

//resend otp

const resendOtp = async (req,res) => {
    try {
        console.log(req.body);
        const userData = req.body;
       const resentOtp = await sendMail(userData.name, userData.email);
       console.log('old'+req.session.otp);
       console.log('old'+req.session.id);
       req.session.otp = resentOtp
       req.session.save();
       console.log(req.session.otp);
       console.log(resentOtp);
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
    editAddress,
    loadAddAddress,
    addAddress,
    loadAbout,
    resetPassword,
    searchResult,
    resendOtp
    
};
