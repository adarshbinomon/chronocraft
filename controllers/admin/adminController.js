const bcrypt = require('bcrypt');
const User = require('../../model/userModel');




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
    try {
        const email = req.body.email;
        const password = req.body.password;

    const adminData = await User.findOne({email: email})
    if(adminData){
        const passwordMatch = await bcrypt.compare(password,adminData.password)
        if(passwordMatch && adminData.isAdmin==1){
            req.session.admin_id = adminData._id;
            console.log(adminData);
            res.redirect('/admin')
            console.log(req.session);
        }else{
            res.render('adminLogin', {message: "email or password incorrect"})

        }
    }else{
        res.render('adminLogin', {message: "email or password incorrect"})

    }
        
    } catch (error) {
        console.log(error.message);
    }
    
}
//load home

const loadDashboard = async(req,res)=>{
    try {
        const adminData = await User.findById({_id:req.session.admin_id})
        res.render('adminDashboard',{adminData:adminData})
    } catch (error) {
        console.log(error.message); 
    }
}
//admin logout

const logOut = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/admin/login')
    } catch (error) {
        console.log(error.message);
    }
} 

module.exports ={
    loadLogin,
    adminLogin,
    loadDashboard,
    logOut
}