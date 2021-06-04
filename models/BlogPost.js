const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validateURL = url => {
    const address = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    return address.test(url)
}

const BlogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true,
        validate: [validateURL, 'Image URL must be in the following format: https://my-url-here.com'],
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Image URL must be in the following format: https://my-url-here.com']
    },
    alt: {
        type: String,
        trim: true,
        required: true
    },
    intro: {
        type: String,
        trim: true
    },
    // Section objects w/ heading and paragraph
    headings: {
        type: [String]
    },
    paragraphs: {
        type: [String]
    }
});

const BlogPost = mongoose.model('BlogPost', BlogSchema);
module.exports = BlogPost;