const bcrypt = require('bcrypt');


//load login

const loadLogin = async(req,res)=>{
    try {
        res.render('adminLogin')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}

//admin login

const adminLogin = async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password);

}

module.exports ={
    loadLogin,
    adminLogin
}