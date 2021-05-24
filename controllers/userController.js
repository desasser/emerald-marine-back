const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { authenticateMe, secret } = require('../helpers/auth');
const { handleError } = require('../helpers/handleError');


const router = express.Router();

router.post('/users/new', (req, res) => {
    db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }).then(data => {
        if (data) {
            const token = jwt.sign({
                username: data.username,
                id: data._id
            }, secret,
                {
                    expiresIn: '2h'
                });
            res.json({ user: data, token })
        }
        else {
            res.status(404).send('Username or password is incorrect.')
        }
    }).catch(err => {
        res.status(500).send(`${handleError(err)}`)
    });
});

router.post('/users', (req, res) => {
    db.User.findOne({ username: req.body.username }).then(data => {
        if (!data) {
            res.status(404).send("IMPOSTER!")
        } else if (bcrypt.compareSync(req.body.password, data.password)) {
            const token = jwt.sign({
                username: data.username,
                id: data._id
            },
                secret,
                {
                    expiresIn: "2h"
                });
            res.json({
                user: data, token
            })
        } else {
            res.status(404).send('Username or password is incorrect.')
        }
    }).catch(err => {
        res.status(500).send(`${handleError(err)}`)
    });
});

router.get('/users', (req, res) => {
    let tokenData = authenticateMe(req, secret);
    if (!tokenData) {
        res.status(401).send('You must be an administrator to access user records.')
    } else {
        db.User.findOne({
            _id: tokenData.id
        }).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).send(`${handleError(err)}`)
        });
    }
});

router.put('/users/:username', (req, res) => {
    let tokenData = authenticateMe(req, secret);
    let newPassword = ''
    db.User.findOne({ username: req.params.username }).then(data => {
        if (!data) {
            res.status(404).send('User not found.')
        } else if (!tokenData) {
            res.status(401).send('You must be an administrator to edit a user account.')
        } else if (!req.params.username) {
            res.status(400).send('You must select a user to edit.')
        } else {
            bcrypt.compareSync(req.body.password, data.password) ? newPassword = data.password : newPassword = bcrypt.hashSync(req.body.password, 10)
            db.User.updateOne({ username: req.params.username }, {
                username: req.body.username,
                email: req.body.email,
                password: newPassword
            }).then(response => {
                response ? res.status(200).send('User updated successfully.') : res.send('Failed to update user, please try again.')
            });
        }
    }).catch(err => {
        res.status(500).send(`${handleError(err)}`)
    });
});

router.delete('/users/:username', (req, res) => {
    if (!req.params.username) {
        res.status(400).send('You must select a user to delete.')
    } else {
        db.User.deleteOne({
            username: req.params.username
        }, err => {
            res.status(500).send(`${handleError(err)}`)
        });
    }
});

module.exports = router;