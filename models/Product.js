const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validateURL = url => {
    const address = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    return address.test(url)
}

const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    // parseFloat prices on front end
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
        type: [String],
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    video: {
        type: String,
        trim: true,
        validate: [validateURL, 'Video URL must be in the following format: https://my-url-here.com'],
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Video URL must be in the following format: https://my-url-here.com']
    },
    image: {
        type: String,
        trim: true,
        required: true,
        validate: [validateURL, 'Image URL must be in the following format: https://my-url-here.com'],
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Image URL must be in the following format: https://my-url-here.com'] 
    },
    // parseFloat dimensions on front end
    weight: {
        type: String,
        trim: true,
        required: true
    },
    length: {
        type: String,
        trim: true,
        required: true
    },
    width: {
        type: String,
        trim: true,
        required: true
    },
    height: {
        type: String,
        trim: true,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product;

