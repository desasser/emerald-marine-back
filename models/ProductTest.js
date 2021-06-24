const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validateEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const ProductTestSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required.',
        validate: [validateEmail, 'Email must be in the following format: abc@def.com'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email must be in the following format: abc@def.com']
    }
});

const ProductTest = mongoose.model('ProductTest', ProductTestSchema)
module.exports = ProductTest;