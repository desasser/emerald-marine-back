const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models');
const seeds = require('../config/blogSeeds');
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

router.get('/blogposts', (req, res) => {
    db.BlogPost.find({}).then(data => {
        data ? res.json(data) : res.status(404).send('No blog posts found.')
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.get('/blogposts/:id', (req, res) => {
    db.BlogPost.findOne({ _id: req.params.id }).then(data => {
        data ? res.json(data) : res.status(404).send('No blog post found.')
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.post('/blogposts/seed', (req, res) => {
    db.BlogPost.create(seeds.blog).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.post('/blogposts', (req, res) => {
    const tokenData = authenticateMe(req);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to create a blog post.')
    } else {
        db.BlogPost.create(req.body).then(data => {
            res.json(data)
        }).catch(err => {
            err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
        });
    }
});

router.put('/blogposts/:id', (req, res) => {
    const tokenData = authenticateMe(req);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to edit a blog post.')
    } else if (!req.params.id) {
        res.status(400).send('Please select a post to edit.')
    } else if (!req.body.title) {
        res.status(400).send('Title is required.')
    } else if (!req.body.date) {
        res.status(400).send('Date is required.')
    } else if(!req.body.categories[0]) {
        res.status(400).send('Post must have at least one category.')
    } else if(!req.body.tags) {
        res.status(400).send('Post must have at least one tag.')
    } else if(!req.body.image) {
        res.status(400).send('Image URL is required.')
    } else if(!req.body.alt) {
        res.status(400).send('Image alt tag is required.')
    } else if(!req.body.title) {
        res.status(400).send('Title is required.')
    } else if(!req.body.headings[0]) {
        res.status(400).send('Post must have at least one heading.')
    } else if(!req.body.paragraphs[0]) {
        res.status(400).send('Post must have content.')
    } else {
        db.BlogPost.findOneAndUpdate({_id: req.params.id}, req.body).then(data => {
            if(data) {
                db.BlogPost.findOne({_id: data._id}).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
        });
    }
});

router.delete('/blogposts/:id', (req, res) => {
    const tokenData = authenticateMe(req);

    if(!tokenData) {
        res.status(401).send('You must be an administrator to delete a blog post.')
    } else if(!req.params.id) {
        res.status(400).send('Please select a blog post to delete.')
    } else {
        db.BlogPost.deleteOne({
            _id: req.params.id
        }).then(data => {
            if(data) {
                db.BlogPost.find({}).then(response => {
                    res.json(response)
                })
            } else {
                res.status(404).send('Cannot find blog post to delete.')
            }
        }).catch(err => {
            err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
        });
    }

})

module.exports = router;

