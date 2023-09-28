const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    isListed: {
        type: Boolean,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    expiry: {
        type: Date,
        required: true
    }
})

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
