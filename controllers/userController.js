const User = require('../model/userModel');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

// password encryption

const securePassword = async (password) =>{
    try {
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash
    } catch (error) {
        console.log(error.message);
    }
}

//email send
const sendVerfyMail = async(name,email,user_id)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:  'smpt.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'adarshbinomon.3@gmail.com',
                pass: ''
            }
        })
        const mailOptions = {
            from: 'adarshbinomon.3@gmail.com',
            to: email,
            subject: 'OTP || chronocraft',
            text: `Thank you for choosing Chronocraft. Use this otp to finish your signup ${otp}`
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log('email has been sent',info-response);
            }
        })
    } catch (error) {
        
    }
}

//signup load

const loadRegister =  async(req,res)=>{
    try{

        res.render('signup')

    } catch(error){
        console.log(error.message);
    }
}

//add user

const addUser = async(req,res)=>{
sPassword = await securePassword(req.body.password)
    try{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: sPassword,
            phoneNumber: req.body.phoneNumber,
            isAdmin: 0
        })
        const userData = await user.save();
        console.log(userData);
        
        if(userData){
            sendVerfyMail(req.body.name,req.body.email,userData._id);
            res.render('signup',{message: "registration successfull"})
        }else{
            res.render('signup',{message: "registration failed"})

        }

    } catch(error){
        console.log(error.message);
    }
}



module.exports= {
    loadRegister,
    addUser
}