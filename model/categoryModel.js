const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    category: {
        type: String,
        required: true
    },
    description: {
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
    }
})

    
module.exports = mongoose.model('User',userSchema)