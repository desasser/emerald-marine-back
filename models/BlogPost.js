const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        
    }
})