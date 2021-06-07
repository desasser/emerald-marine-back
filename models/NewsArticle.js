const mongoose = require('mongoose');
const {composeWithMongoose} = require('graphql-compose-mongoose');

const Schema = mongoose.Schema;

const validateURL = url => {
    const address = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    return address.test(url)
}

const NewsSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    publication: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    link: {
        type: String,
        trim: true,
        required: true,
        validate: [validateURL, 'Link must be in the following format: https://my-url-here.com'],
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Link must be in the following format: https://my-url-here.com']
    },
    description: {
        type: String,
        trim: true
    }
});

const NewsArticle = mongoose.model('NewsArticle', NewsSchema);
module.exports = NewsArticle;

module.exports = {
    NewsArticle: mongoose.model('NewsArticle', NewsSchema),
    NewsArticleTC: composeWithMongoose(mongoose.model('NewsArticle', NewsSchema))
};