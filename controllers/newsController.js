const express = require('express');
const db = require('../models');
const seeds = require('../models/seeds/newsSeeds');
const { authenticateMe, secret } = require('../helpers/auth');
const { handleError } = require('../helpers/handleError');

const router = express.Router();

router.get('/news', (req, res) => {
    db.NewsArticle.find({}).then(data => {
        data ? res.json(data) : res.status(404).send('No news articles found.')
    }).catch(err => {
        res.status(500).send(`${handleError(err)}`)
    });
});

router.get('/news/:id', (req, res) => {
    db.NewsArticle.findOne({ _id: req.params.id }).then(data => {
        data ? res.json(data) : res.status(404).send('No news article found.')
    }).catch(err => {
        res.status(500).send(`${handleError(err)}`)
    });
});

router.post('/news/seed', (req, res) => {
    db.NewsArticle.create(seeds.news).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(`${handleError(err)}`)
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
            res.status(500).send(`${handleError(err)}`)
        });
    }
});

router.put('/news/:id', (req, res) => {
    const tokenData = authenticateMe(req, secret);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to edit a blog post.')
    } else if (!req.params.id) {
        res.status(400).send('Please select a post to edit.')
    } else if (!req.body.title) {
        res.status(400).send('Title is required')
    } else if (!req.body.publication) {
        res.status(400).send('Publication is required')
    } else if (!req.body.date) {
        res.status(400).send('Date is required')
    } else if (!req.body.link) {
        res.status(400).send('Link is required')
    } else {
        db.NewsArticle.findOneAndUpdate({ _id: req.params.id }, req.body).then(data => {
            if (data) {
                db.NewsArticle.findOne({ _id: data._id }).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            res.status(500).send(`${handleError(err)}`)
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
            res.status(500).send(`${handleError(err)}`)
        });
    }
});

module.exports = router;