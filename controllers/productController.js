const express = require('express');
const db = require('../models');
const { products } = require('../models/seeds/productSeeds');
const { authenticateMe, secret } = require('../helpers/auth');
const { handle500Error } = require('../helpers/500Error');
const { handleMissingRequiredField } = require('../helpers/missingRequiredField');

const router = express.Router();

// Protect create routes
// Grab list of tags/categories and split into array on ','
router.get('/products/seed', (req, res) => {
    db.Product.create(products).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.get('/products', (req, res) => {
    db.Product.find({}).then(data => {
        data ? res.json(data) : res.status(404).send('No products found.')
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    })
});

router.get('/products/:id', (req, res) => {
    db.Product.findOne({ _id: req.params.id }).then(data => {
        data ? res.json(data) : res.status(404).send('No product found.')
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.post('/products', (req, res) => {
    db.Product.create(req.body).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});


router.put('/products/:id', (req, res) => {
    const tokenData = authenticateMe(req, secret);
    const required = [req.body.name, req.body.description, req.body.price, req.body.SKU, req.body.tags[0], req.body.categories[0], req.body.image, req.body.alt, req.body.length, req.body.width, req.body.height]

    if (!tokenData) {
        res.status(401).send('You must be an administrator to edit a product.')
    } else if (!req.params.id) {
        res.status(400).send('You must select a product to edit.')
    } else if (!req.body.name || !req.body.description || !req.body.price || !req.body.SKU || !req.body.tags[0] || !req.body.categories[0] || !req.body.image || !req.body.alt || !req.body.weight || !req.body.length || !req.body.width || !req.body.height) {
        res.status(400).send(`${handleMissingRequiredField(required)}`)
    } else {
        db.Product.findOneAndUpdate({ _id: req.params.id }, req.body).then(data => {
            if (data) {
                db.Product.findOne({ _id: data._id }).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

router.delete('/products/:id', (req, res) => {
    const tokenData = authenticateMe(req, secret);

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
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});




module.exports = router;