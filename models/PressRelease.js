const mongoose = require('mongoose');
const {composeWithMongoose} = require('graphql-compose-mongoose');

const Schema = mongoose.Schema;

const validateURL = url => {
    const address = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    return address.test(url)
}

const PressSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
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
    content: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = {
    PressRelease: mongoose.model('PressRelease', PressSchema),
    PressReleaseTC: composeWithMongoose(mongoose.model('PressRelease', PressSchema))
};