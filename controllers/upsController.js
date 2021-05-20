const express = require('express');
const shipping = require('ups-shipping');
require('dotenv').config();

const router = express.Router();

const upsKey = process.env.UPS_API_ACCESS_KEY
const upsUser = process.env.UPS_USERNAME
const upsPassword = process.env.UPS_PASSWORD



router.get('/ups', (req, res) => {
    console.log(upsKey);
    console.log(upsUser);
    console.log(upsPassword);
});

module.exports = router;
