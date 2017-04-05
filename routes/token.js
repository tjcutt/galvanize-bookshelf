'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const humps = require('humps');
require('dotenv').config()

router.get('/', (req, res, next) => {
    if (!req.cookies.token) {
        res.send(false);
    }
    else {
        res.send(true);
    }
});

router.post('/', (req, res, next) => {
    if (!req.body.email) {
        return next(boom.create(400, 'Bad email or password'));
    }
    if (!req.body.password) {
        return next(boom.create(400, 'Bad email or password'))
    }
    knex('users')
        .select('*')
        .where('email', req.body.email)
        .then((user) => {
            if (user.length > 0) {
                bcrypt.compare(req.body.password, user[0].hashed_password, function(err, bool) {
                    if (bool) {
                        let token = jwt.sign({
                            email: user[0].email,
                            password: user[0].hashed_password
                        }, 'secret')
                        res.cookie('token', token, {
                            httpOnly: true
                        });
                        delete user[0].hashed_password;
                        res.send(humps.camelizeKeys(user[0]));
                    } else {
                        next(boom.create(400, 'Bad email or password'))
                    }
                })
              } else {
                  next(boom.create(400, 'Bad email or password'))
              }
        });

});
router.delete('/', (req, res, next) => {
    res.cookie('/token', '');
    res.status(200);
    res.send()

});
module.exports = router;
