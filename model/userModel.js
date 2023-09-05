const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Number,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    cart : [{
       productId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product', 
       },     
       quantity: Number,  
   }],
   address: {
    type: Array
   }
    

})

    
module.exports = mongoose.model('User',userSchema)