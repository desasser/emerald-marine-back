const express = require('express');
const axios = require('axios');
const { ConnectionStates } = require('mongoose');
require('dotenv').config();

const router = express.Router();

router.post('/hooman', (req, res) => {
    const isHooman = response => {
        axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${response}`).then(result => {
            result.data.success ? res.json(result.data) : res.send('Response not valid.')
        }).catch(err => {
            err ? res.status(403).send(`Error: ${err}`) : res.status(200).send('Verified.')
        })
    }

    isHooman(req.body.response)
});
    
module.exports = router;

