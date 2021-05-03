const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const db = require('../models');

const router = express.Router();

const authenticateMe = req => {
    let token = false;

    if (!req.headers) {
        token = false
    }
    else if (!req.headers.authorization) {
        token = false;
    }
    else {
        token = req.headers.authorization.split(" ")[1];
    }
    let data = false;
    if (token) {
        data = jwt.verify(token, config.secret, (err, data) => {
            if (err) {
                return false;
            } else {
                return data
            }
        })
    }
    return data;
}

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
            }, config.secret,
                {
                    expiresIn: '2h'
                });
            res.json({ user: data, token })
        }
        else {
            res.status(404).send('Username or password is incorrect.')
        }
    }).catch(err => {
        err ? res.status(500).send(`The server encountered the following error: ${err}`) : res.status(200).send('Login successful.')
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
                config.secret,
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
        err ? res.status(500).send(`The server encountered the following error: ${err}`) : res.status(200).send('Login successful.')
    });
})

router.get('/users', (req, res) => {
    let tokenData = authenticateMe(req);
    if (tokenData) {
        db.User.findOne({
            _id: tokenData.id
        }).then(data => {
            res.json(data)
        }).catch(err => {
            err ? res.status(500).send(`The server encountered the following error: ${err}`) : res.status(200).send('Login successful.')
        });
    }
});

router.put('/users/:username', (req, res) => {
    db.User.updateOne({
        username: req.params.username
    }, {
        email: req.body.email
    }).then(data => {
        data ? res.status(200).send('Email updated successfully.') : res.send('Email failed to update, please try again.')
    }).catch(err => {
        err ? res.status(500).send(`The server encountered the following error: ${err}`) : res.status(200).send('Email updated successfully.')
    });
});

router.delete('/users/:username', (req, res) => {
    db.User.deleteOne({
        username: req.params.username
    }, err => {
        err ? res.status(500).send(`Error deleting user: ${err}`) : res.status(200).send('User deleted successfully.')
    });
});

module.exports = router;