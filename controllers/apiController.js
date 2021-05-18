const express = require('express');
const shipping = require('ups-shipping');
require('dotenv').config();

const router = express.Router();

const upsKey = process.env.UPS_API_ACCESS_KEY
const upsUser = process.env.UPS_USERNAME
const upsPassword = process.env.UPS_PASSWORD

const authClientKey = process.env.AUTHORIZE_JS_CLIENT_KEY
const authTransactionKey = process.env.AUTHORIZE_JS_TRANSACTION_KEY
const authUser = process.env.AUTHORIZE_JS_LOGIN_ID


router.get('/ups', (req, res) => {
    console.log(authClientKey);
    console.log(authUser);
    console.log(authTransactionKey);
});

module.exports = router;
