const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isListed: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String
    },
    
})

    
module.exports = mongoose.model('Category',categorySchema)