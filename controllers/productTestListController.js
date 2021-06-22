const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { authenticateMe, secret } = require('../helpers/auth');
const { handle500Error } = require('../helpers/500Error');
const { handleMissingRequiredField } = require('../helpers/missingRequiredField');
const { testList } = require('../models/seeds/productTestSeeds');

const router = express.Router();

router.get('/test/seed', (req, res) => {
    db.ProductTest.create(testList).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.post('/test', (req, res) => {
    db.ProductTest.create(req.body).then(data => {
         if (!req.body.email) {
            res.status(400).send('Please enter a valid email address.')
        } else {
            res.json(data)
        }
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.get('/test', (req, res) => {
    const tokenData = authenticateMe(req, secret);
    if (!tokenData) {
        res.status(401).send('You must be an administrator to access product test reminder list.')
    } else {
        db.ProductTest.find({}).then(data => {
            data ? res.json(data) : res.status(404).send('Product test reminder list is empty.')
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

router.put('/test/:id', (req, res) => {
    const tokenData = authenticateMe(req, secret);
    const required = [req.body.name, req.body.email]
    if (!tokenData) {
        res.status(401).send('You must be an administrator to update product testing reminder list.')
    } else if (!req.params.id) {
        res.status(400).send('Please select an entry to edit.')
    } else if (!req.body.email) {
        res.status(400).send(`${handleMissingRequiredField(required)}`)
    } else {
        db.ProductTest.findOneAndUpdate({ _id: req.params.id }, req.body).then(data => {
            if (data) {
                db.ProductTest.findOne({ _id: req.params.id }).then(response => {
                    res.json(response)
                });
            }
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

router.delete('/test/:email', (req, res) => {
    if (!req.params.email) {
        res.status(400).send('Please select an entry to delete.')
    } else {
        db.ProductTest.deleteOne({ email: req.params.email }).then(data => {
            if (data) {
                res.send(`${req.params.email} has been successfully unsubscribed from the product testing reminders list.`)
            }
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

module.exports = router;