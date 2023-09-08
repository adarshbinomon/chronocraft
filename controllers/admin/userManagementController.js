const User = require('../../model/userModel');
const { logOut } = require('./adminController');



//load users page

const loadUsers = async (req,res)=>{
    try {
        const members = await User.find();
        console.log(members);
        res.render('users',{users: members})
    } catch (error) {
        console.log(error.message);
    }
}

//load edit user

const loadEditUser = async (req,res)=>{
    try {
        const id = req.params.id;
        User.findById(id).then((data)=>{
            console.log(id);
            console.log(data);
            res.render('editUser',{data: data})
        }).catch((error)=>{
            console.log(error);
        })
    } catch (error) {
        console.log(error.message);
    }
    }

//edit user

const editUser = async(req,res)=>{
    try {
        console.log(req.body);
        const id = req.params.id;
        const data = {
            name : req.body.name,
            email: req.body.email,
            phoneNumber : req.body.phoneNumber,
            isActive : req.body.isActive
            }
        console.log(data);
        await User.findByIdAndUpdate(id,data)

        res.redirect('/admin/users')

    } catch (error) {
        console.log(error.message);
    }
}

//block or unblock user

const blockOrUnblockUser = async (req,res)=>{
    try {
        const id = req.params.id;
        let block = {
            isActive : false
        }
        let unBlock = {
            isActive : true
        }
        const user = await User.findById(id);
        if(user.isActive){
            await User.findByIdAndUpdate(id,block)
        }else{
            await User.findByIdAndUpdate(id,unBlock)
        }
        res.status(200).json({ message: 'User status updated successfully', user: user });
        // res.redirect('/admin/users')
    } catch (error) {
        console.log(error.message);
    }
}





module.exports= {
    loadUsers,
    loadEditUser,
    editUser,
    blockOrUnblockUser
}
