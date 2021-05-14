const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models');
const seeds = require('../config/productSeeds');
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

router.get('/products', (req, res) => {
    db.Product.find({}).then(data => {
        data ? res.json(data) : res.status(404).send('No products found.')
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.get('/products/:id', (req, res) => {
    db.Product.findOne({_id: req.params.id}).then(data => {
        data ? res.json(data) : res.status(404).send('No product found.')
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.post('/products', (req, res) => {
    db.Product.create(req.body).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.post('/products/seed', (req, res) => {
    db.Product.create(seeds.products).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
    });
});

router.put('/products/:id', (req, res) => {
    const tokenData = authenticateMe(req);

    if (!req.params.id) {
        res.status(400).send('You must select a product to update.')
    } else if (!tokenData) {
        res.status(401).send('You must be an administrator to update a product.')
    } else if (!req.body.name) {
        res.status(400).send('Product name is required.')
    } else if (!req.body.description) {
        res.status(400).send('Product description is required.')
    } else if (!req.body.price) {
        res.status(400).send('Product price is required')
    } else if (!req.body.SKU) {
        res.status(400).send('Product SKU is required.')
    } else if (!req.body.tags[0]) {
        res.status(400).send('Product must have at least one tag.')
    } else if (!req.body.categories[0]) {
        res.status(400).send('Product must have at least one category.')
    } else if (!req.body.image) {
        res.status(400).send('Product image URL is required.')
    } else if (!req.body.weight) {
        res.status(400).send('Product weight is required.')
    } else if (!req.body.length) {
        res.status(400).send('Product length is required.')
    } else if (!req.body.width) {
        res.status(400).send('Product width is required.')
    } else if (!req.body.height) {
        res.status(400).send('Product height is required.')
    } else {
        db.Product.findOneAndUpdate({_id: req.params.id}, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            SKU: req.body.SKU,
            tags: req.body.tags,
            categories: req.body.categories,
            image: req.body.image,
            video: req.body.video,
            weight: req.body.weight,
            length: req.body.length,
            height: req.body.height,
            width: req.body.width
        }).then(data => {
            if(data) {
                db.Product.findOne({_id: data._id}).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
        });
    }
});

router.delete('/products/:id', (req, res) => {
    const tokenData = authenticateMe(req);

    if(!req.params.id) {
        res.status(400).send('You must select a product to delete.')
    } else if(!tokenData) {
        res.status(401).send('You must be logged in to delete a product.')
    } else {
        db.Product.deleteOne({
            _id: req.params.id
        }).then(data => {
            if(data) {
                db.Product.find({}).then(response => {
                    res.json(response)
                })
            } else {
                res.status(404).send('Cannot find product to delete.')
            }
        }).catch(err => {
            err ? res.status(500).send(`Oops! The server encountered the following error: ${err}`) : res.status(200)
        });
    }
    
});




module.exports = router;