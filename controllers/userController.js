const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../env/env');

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

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            },
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
            console.log(savedUser);
            res.render('otpVerify', { message: 'User successfully registered!' });
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


module.exports = {
    loadRegister,
    addUser,
    verifyOtp,
    loadLogin
};
