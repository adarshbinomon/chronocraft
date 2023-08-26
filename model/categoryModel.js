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
        type: Boolean,
        required: true,
        default: 0
    },
    image: {
        type: String
    },
    
})

    
module.exports = mongoose.model('Category',categorySchema)