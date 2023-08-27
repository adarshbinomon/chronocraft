const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },
    brandName: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    regularPrice: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    // date: {
    //     type: date()
    // },
    // stockStatus: {
    //     type: Boolean,
    //     required: true
    // },
    quantity:{
        type: Number
    },
    isListed: {
        type: Boolean,
        required: true,
        default: 1
    },
    image: {
        type: Array
    }
    
})

    
module.exports = mongoose.model('Product',productSchema)