const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { authenticateMe, secret } = require('../helpers/auth');
const { handle500Error } = require('../helpers/500Error');
const { mailingList } = require('../models/seeds/mailingListSeeds');

const router = express.Router();

router.post('/mailing/seed', (req, res) => {
    db.MailingList.create(mailingList).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.post('/mailing', (req, res) => {
    db.MailingList.create(req.body).then(data => {
        if (!req.body.name) {
            res.status(400).send('Please enter your name.')
        } else if (!req.body.email) {
            res.status(400).send('Please enter a valid email address.')
        } else {
            res.json(data)
        }
    }).catch(err => {
        res.status(500).send(`${handle500Error(err)}`)
    });
});

router.get('/mailing', (req, res) => {
    const tokenData = authenticateMe(req, secret);
    if (!tokenData) {
        res.status(401).send('You must be an administrator to access mailing list.')
    } else {
        db.MailingList.find({}).then(data => {
            data ? res.json(data) : res.status(404).send('Mailing list is empty.')
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

router.put('/mailing/:id', (req, res) => {
    const tokenData = authenticateMe(req, secret);
    const required = [req.body.name, req.body.email]
    if (!tokenData) {
        res.status(401).send('You must be an administrator to update mailing list.')
    } else if (!req.params.id) {
        res.status(400).send('Please select an entry to edit.')
    } else if (!req.body.name || !req.body.email) {
        res.status(400).send(`${handleMissingRequiredField(required)}`)
    } else {
        db.MailingList.findOneAndUpdate({ _id: req.params.id }, req.body).then(data => {
            if (data) {
                db.MailingList.findOne({ _id: req.params.id }).then(response => {
                    res.json(response)
                })
            }
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

router.delete('/mailing/:email', (req, res) => {
    if (!req.params.email) {
        res.status(400).send('Please select an entry to delete.')
    } else {
        db.MailingList.deleteOne({ email: req.params.email }).then(data => {
            if (data) {
                res.send(`${req.params.email} has been successfully unsubscribed from the mailing list.`)
            }
        }).catch(err => {
            res.status(500).send(`${handle500Error(err)}`)
        });
    }
});

module.exports = router;

