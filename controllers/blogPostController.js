const express = require('express');
const db = require('../models');
const seeds = require('../models/seeds/blogSeeds');
const config = require('../helpers/auth');
const { handleError } = require('../helpers/handleError');

const router = express.Router();

router.get('/blogposts', (req, res) => {
    db.BlogPost.find({}).then(data => {
        data ? res.json(data) : res.status(404).send('No blog posts found.')
    }).catch(err => {
        handleError(err);
    });
});

router.get('/blogposts/:id', (req, res) => {
    db.BlogPost.findOne({ _id: req.params.id }).then(data => {
        data ? res.json(data) : res.status(404).send('No blog post found.')
    }).catch(err => {
        handleError(err);
    });
});

router.post('/blogposts/seed', (req, res) => {
    db.BlogPost.create(seeds.blog).then(data => {
        res.json(data)
    }).catch(err => {
        handleError(err);
    });
});

router.post('/blogposts', (req, res) => {
    const tokenData = config.authenticateMe(req, config.secret);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to create a blog post.')
    } else {
        db.BlogPost.create(req.body).then(data => {
            res.json(data)
        }).catch(err => {
            handleError(err);
        });
    }
});

router.put('/blogposts/:id', (req, res) => {
    const tokenData = config.authenticateMe(req, config.secret);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to edit a blog post.')
    } else if (!req.params.id) {
        res.status(400).send('Please select a post to edit.')
    } else if (!req.body.title) {
        res.status(400).send('Title is required.')
    } else if (!req.body.date) {
        res.status(400).send('Date is required.')
    } else if (!req.body.categories[0]) {
        res.status(400).send('Post must have at least one category.')
    } else if (!req.body.tags) {
        res.status(400).send('Post must have at least one tag.')
    } else if (!req.body.image) {
        res.status(400).send('Image URL is required.')
    } else if (!req.body.alt) {
        res.status(400).send('Image alt tag is required.')
    } else if (!req.body.title) {
        res.status(400).send('Title is required.')
    } else if (!req.body.headings[0]) {
        res.status(400).send('Post must have at least one heading.')
    } else if (!req.body.paragraphs[0]) {
        res.status(400).send('Post must have content.')
    } else {
        db.BlogPost.findOneAndUpdate({ _id: req.params.id }, req.body).then(data => {
            if (data) {
                db.BlogPost.findOne({ _id: data._id }).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            handleError(err);
        });
    }
});

router.delete('/blogposts/:id', (req, res) => {
    const tokenData = config.authenticateMe(req, config.secret);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to delete a blog post.')
    } else if (!req.params.id) {
        res.status(400).send('Please select a blog post to delete.')
    } else {
        db.BlogPost.deleteOne({
            _id: req.params.id
        }).then(data => {
            if (data) {
                db.BlogPost.find({}).then(response => {
                    res.json(response)
                })
            } else {
                res.status(404).send('Cannot find blog post to delete.')
            }
        }).catch(err => {
            handleError(err);
        });
    }

});

module.exports = router;

