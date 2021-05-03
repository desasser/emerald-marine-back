const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validateEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required.'
    }, 
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required.',
        validate: [validateEmail, 'Email must be in the following format: abc@def.com'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email must be in the following format: abc@def.com']
    },
    password: {
        type: String,
        trim: true,
        minLength: 8
    }
});

const User = mongoose.model('User', UserSchema)
module.exports = User;