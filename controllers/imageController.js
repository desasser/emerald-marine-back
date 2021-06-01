const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const paramsConfig = require('../helpers/params-config');

const router = express.Router();

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});

const upload = multer({ storage }).single('image');

const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

router.post('/image-upload', upload, (req, res) => {
    const params = paramsConfig(req.file);
    // console.log(`Here's the request body: ${JSON.stringify(req.body), null, 2}`)
    // console.log(`Here's the whole damn thing: ${JSON.stringify(req, function(key, value) {if(key == 'parent') {return value} else {return value}})}`)
    // console.log(`Here's the file: ${JSON.stringify(req.file)}`);

    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.json(data);
    });
});


module.exports = router;