'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const humps = require('humps');

router.get('/', (req, res, next) => {
    knex('favorites')
        .join('books', 'books.id', 'favorites.book_id')
        .then((favorites) => {
            console.log(favorites)
            res.send(humps.camelizeKeys(favorites))
        });
});

router.get('/check', (req, res, next) => {
    if (!req.cookies.token) {
        return next(boom.create(401, 'Unauthorized'));
    } else {
        let id = +req.query.bookId
        if (id === 1) {
            res.send(true)
        } else if (id === 2) {
            res.send(false)
        }
    }
})

router.post('/', (req, res, next) => {
    if (!req.cookies.token) {
        return next(boom.create(401, 'Unauthorized'));
    } else {
      
    }
})

module.exports = router;
