const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    content: {
        type: String,
        trim: true,
        required: true
    }
});

const BlogPost = mongoose.model('BlogPost', BlogSchema);
module.exports = BlogPost;