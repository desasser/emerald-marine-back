const express = require('express');
const db = require('../models');
const seeds = require('../models/seeds/productSeeds');
const config = require('../config/auth');
const { handleError } = require('../helpers/handleError');

const router = express.Router();

router.get('/products', (req, res) => {
    db.Product.find({}).then(data => {
        data ? res.json(data) : res.status(404).send('No products found.')
    }).catch(err => {
        handleError(err);
    });
});

router.get('/products/:id', (req, res) => {
    db.Product.findOne({ _id: req.params.id }).then(data => {
        data ? res.json(data) : res.status(404).send('No product found.')
    }).catch(err => {
        handleError(err);
    });
});

router.post('/products', (req, res) => {
    db.Product.create(req.body).then(data => {
        res.json(data)
    }).catch(err => {
        handleError(err);
    });
});

router.post('/products/seed', (req, res) => {
    db.Product.create(seeds.products).then(data => {
        res.json(data)
    }).catch(err => {
        handleError(err);
    });
});

router.put('/products/:id', (req, res) => {
    const tokenData = config.authenticateMe(req, config.secret);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to edit a product.')
    } else if (!req.params.id) {
        res.status(400).send('You must select a product to edit.')
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
    } else if (!req.body.alt) {
        res.status(400).send('Image alt tag is required.')
    } else if (!req.body.weight) {
        res.status(400).send('Product weight is required.')
    } else if (!req.body.length) {
        res.status(400).send('Product length is required.')
    } else if (!req.body.width) {
        res.status(400).send('Product width is required.')
    } else if (!req.body.height) {
        res.status(400).send('Product height is required.')
    } else {
        db.Product.findOneAndUpdate({ _id: req.params.id }, req.body).then(data => {
            if (data) {
                db.Product.findOne({ _id: data._id }).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            handleError(err);
        });
    }
});

router.delete('/products/:id', (req, res) => {
    const tokenData = config.authenticateMe(req, config.secret);

    if (!tokenData) {
        res.status(401).send('You must be an administrator to delete a product.')
    } else if (!req.params.id) {
        res.status(400).send('Please select a product to delete.')
    } else {
        db.Product.deleteOne({
            _id: req.params.id
        }).then(data => {
            if (data) {
                db.Product.find({}).then(response => {
                    res.json(response)
                })
            } else {
                res.status(404).send('Cannot find product to delete.')
            }
        }).catch(err => {
            handleError(err);
        });
    }
});




module.exports = router;