const express = require('express');
const db = require('../models');
const {blog} = require('../models/seeds/blogSeeds');
const { authenticateMe, secret } = require('../helpers/auth');
const { handle500Error } = require('../helpers/500Error');

const router = express.Router();

router.get('/blogposts/seed', (req, res) => {
    db.BlogPost.create(blog).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.get('/blogposts', (req, res) => {
    db.BlogPost.find({}).then(data => {
        data ? res.json(data) : res.status(404).send('No blog posts found.')
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.get('/blogposts/:id', (req, res) => {
    db.BlogPost.findOne({ _id: req.params.id }).then(data => {
        data ? res.json(data) : res.status(404).send('No blog post found.')
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.post('/blogposts', (req, res) => {
    const tokenData = authenticateMe(req, secret);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to create a blog post.')
    } else {
        db.BlogPost.create(req.body).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

router.put('/blogposts/:id', (req, res) => {
    const tokenData = authenticateMe(req, secret);
    const required = [req.body.title, req.body.date, req.body.categories[0], req.body.tags[0], req.body.image, req.body.alt, req.body.title, req.body.sections[0]]

    if (!tokenData) {
        res.status(401).send('You must be an administrator to edit a blog post.')
    } else if (!req.params.id) {
        res.status(400).send('Please select a post to edit.')
    } else if (!req.body.title || !req.body.date || !req.body.categories[0] || !req.body.tags[0] || !req.body.image || !req.body.alt || !req.body.title || !req.body.sections[0]) {
        res.status(400).send(`${handleMissingRequiredField(required)}`)
    } else {
        db.BlogPost.findOneAndUpdate({ _id: req.params.id }, req.body).then(data => {
            if (data) {
                db.BlogPost.findOne({ _id: data._id }).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

router.delete('/blogposts/:id', (req, res) => {
    const tokenData = authenticateMe(req, secret);

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
            res.status(500).send(`${handle500Error(err)}`)
        });
    }

});

router.get('/stupid', (req, res) => {
    res.json(blog)
});

module.exports = router;

