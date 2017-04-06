'use strict';

const express = require('express');
const knex = require('../knex');
const humps = require('humps');
const router = express.Router();
const boom = require('boom');
const ev = require('express-validation');
const validations = require('../validations/books');

router.get('/', (req, res, next) => {
    knex('books')
        .orderBy('title')
        .then(books => {
            res.send(humps.camelizeKeys(books));
        });
});

router.get('/:id', (req, res, next) => {
    knex('books')
        .where('id', req.params.id)
        .then(books => {
            res.send(humps.camelizeKeys(books[0]));
        });
});

router.post('/', (req, res, next) => {
    knex('books')
        .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
        .insert({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            cover_url: req.body.coverUrl
        })
        .then(book => {
            res.send(humps.camelizeKeys(book[0]));
        })
})

router.patch('/:id', ev(validations.patch), (req, res, next) => {
    let id = req.params.id
    knex('books')
        .where('id', id)
        .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
        .update({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            cover_url: req.body.coverUrl
        })
        .then((book) => {
            res.send(humps.camelizeKeys(book[0]));
        })
});

router.delete('/:id', (req, res, next) => {
    knex('books')
        .returning(['title', 'author', 'genre', 'description', 'cover_url'])
        .where('id', req.params.id)
        .del()
        .then(book => {
            res.send(humps.camelizeKeys(book[0]));
        });
});

// =================== BONUS

// router.get('/:id', (req, res, next) => {
//let id = req.params.id;
//if (typeof id === 'string'){
//   next(boom.create(404, 'Not Found'))
// }

//if(!id){}

//   knex('books')
//      .whereNot('id', req.params.id)
//      .then(()=>{
//        res.status('404')
//      });
// })

module.exports = router;
