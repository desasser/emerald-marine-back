const mongoose = require('mongoose');
const {composeWithMongoose} = require('graphql-compose-mongoose');

const Schema = mongoose.Schema;

const validateEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const MailingListSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required.',
        validate: [validateEmail, 'Email must be in the following format: abc@def.com'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email must be in the following format: abc@def.com']
    },
    name: {
        type: String,
        trim: true,
        required: 'Name is required.'
    }
});

module.exports = {
    MailingList: mongoose.model('MailingList', MailingListSchema),
    MailingListTC: composeWithMongoose(mongoose.model('MailingList', MailingListSchema))
};