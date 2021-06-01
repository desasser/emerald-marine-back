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

    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.json(data);
    });
});


module.exports = router;