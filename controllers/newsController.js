const express = require('express');
const db = require('../models');
const {news} = require('../models/seeds/newsSeeds');
const { authenticateMe, secret } = require('../helpers/auth');
const { handle500Error } = require('../helpers/500Error');
const { handleMissingRequiredField } = require('../helpers/missingRequiredField');

const router = express.Router();

router.get('/news', (req, res) => {
    db.NewsArticle.find({}).then(data => {
        data ? res.json(data) : res.status(404).send('No news articles found.')
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.get('/news/:id', (req, res) => {
    db.NewsArticle.findOne({ _id: req.params.id }).then(data => {
        data ? res.json(data) : res.status(404).send('No news article found.')
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.get('/news/seed', (req, res) => {
    db.NewsArticle.create(news).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.post('/news', (req, res) => {
    const tokenData = authenticateMe(req, secret);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to create a blog post.')
    } else {
        db.NewsArticle.create(req.body).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

router.put('/news/:id', (req, res) => {
    const tokenData = authenticateMe(req, secret);
    const required = [req.body.title, req.body.publication, req.body.date, req.body.link]

    if (!tokenData) {
        res.status(401).send('You must be an administrator to edit a blog post.')
    } else if (!req.params.id) {
        res.status(400).send('Please select a post to edit.')
    } else if (!req.body.title || !req.body.publication || !req.body.date || !req.body.link) {
        res.status(400).send(`${handleMissingRequiredField(required)}`)
    } else {
        db.NewsArticle.findOneAndUpdate({ _id: req.params.id }, req.body).then(data => {
            if (data) {
                db.NewsArticle.findOne({ _id: data._id }).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

router.delete('/news/:id', (req, res) => {
    const tokenData = authenticateMe(req, secret);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to delete a blog post.')
    } else if (!req.params.id) {
        res.status(400).send('Please select a blog post to delete.')
    } else {
        db.NewsArticle.deleteOne({ _id: req.params.id }).then(data => {
            if (data) {
                db.NewsArticle.find({}).then(response => {
                    res.json(response)
                })
            } else {
                res.status(404).send('Cannot find news article to delete.')
            }
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

module.exports = router;