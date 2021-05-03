const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    // parseFloat on front end
    price: {
        type: String,
        trim: true,
        required: true
    },
    SKU: {
        type: String,
        trim: true,
        required: true
    },
    tags: {
        type: [[String]],
        required: true
    },
    categories: {
        type: [[String]],
        required: true
    }, 
    video: {
        type: String,
        trim: true,
        required: true
    }
})

