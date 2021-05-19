const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models');
const seeds = require('../config/pressSeeds');
const config = require('../config/auth');

const router = express.Router();

const authenticateMe = req => {
    let token = false;
    req.headers.authorization ? token = req.headers.authorization.split(` `)[1] : token = false

    let data = false
    if (token) {
        data = jwt.verify(token, config.secret, (err, data) => {
            if (err) {
                return false
            } else {
                return data
            }
        });
    }
    return data
}

router.get('/press', (req, res) => {
    db.PressRelease.find({}).then(data => {
        data ? res.json(data) : res.status(404).send('No press releases found.')
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.get('/press/:id', (req, res) => {
    db.PressRelease.findOne({_id: req.params.id}).then(data => {
        data ? res.json(data) : res.status(404).send('No press releases found.')
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.post('/press/seed', (req, res) => {
    db.PressRelease.create(seeds.press).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.post('/press', (req, res) => {
    const tokenData = authenticateMe(req);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to create a blog post.')
    } else {
        db.PressRelease.create(req.body).then(data => {
            res.json(data)
        }).catch(err => {
            err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
        });
    }
});

router.put('/press/:id', (req, res) => {
    const tokenData = authenticateMe(req);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to edit a blog post.')
    } else if (!req.params.id) {
        res.status(400).send('Please select a post to edit.')
    } else if(!req.body.title) {
        res.status(400).send('Title is required.')
    } else if(!req.body.date) {
        res.status(400).send('Date is required.')
    } else if(!req.body.image) {
        res.status(400).send('Image URL is required.')
    } else if(!req.body.alt) {
        res.status(400).send('Image alt tag is required.')
    } else if(!req.body.content) {
        res.status(400).send('Content is required.')
    } else {
        db.PressRelease.findOneAndUpdate({_id: req.params.id}, req.body).then(data => {
            if(data) {
                db.PressRelease.findOne({_id: data._id}).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
        });
    }
});

router.delete('/press/:id', (req, res) => {
    const tokenData = authenticateMe(req);

    if(!tokenData) {
        res.status(401).send('You must be an administrator to delete a press release.')
    } else if(!req.params.id) {
        res.status(400).send('Please select a press release to delete.')
    } else {
        db.PressRelease.deleteOne({_id: req.params.id}).then(data => {
            if(data) {
                db.PressRelease.find({}).then(response => {
                    res.json(response)
                })
            } else {
                res.status(404).send('Cannot find press release to delete.')
            }
        }).catch(err => {
            err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
        });
    }
});

module.exports = router;