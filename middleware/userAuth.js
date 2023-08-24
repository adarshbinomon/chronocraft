const isLogIn = async(req,res,next)=>{
    try {
        
        if(req.session.user_id){
            console.log(req.session.user_id)
            next();
        }else{
            res.redirect('/')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const isLogOut = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            res.redirect('/login')
        }else{
            next();
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isLogIn,
    isLogOut
}