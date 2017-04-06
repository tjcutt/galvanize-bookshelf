'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const humps = require('humps');

router.get('/', (req, res, next) => {
  if (!req.cookies.token) {
      return next(boom.create(401, 'Unauthorized'));
  } else {
    knex('favorites')
        .join('books', 'books.id', 'favorites.book_id')
        .then((favorites) => {
            res.send(humps.camelizeKeys(favorites))
        });
      }
});

router.get('/check', (req, res, next) => {
    if (!req.cookies.token) {
        return next(boom.create(401, 'Unauthorized'));
    } else {
        let id = +req.query.bookId
      knex('favorites')
        .where('book_id', id)
        .then((fav) => {
          if (fav.length === 0) {
            res.send(false)
          } else {
            res.send(true)
          }
        }
      )
    }
})

router.post('/', (req, res, next) => {
    if (!req.cookies.token) {
        return next(boom.create(401, 'Unauthorized'));
    } else
    // {
    //     let bookId = req.body.bookId
    //     if (typeof bookId !== 'number') {
    //         next(boom.create(400, 'Please enter a valid number'))
    //     }
        // else
         {
            knex('favorites')
                .insert({
                    book_id: req.body.bookId,
                    user_id: 1
                })
                .returning('*')
                .then((book) => {
                    res.send(humps.camelizeKeys(book[0]));
                });
        }
    // }
})

router.delete('/', (req, res, next) => {
    if (!req.cookies.token) {
        return next(boom.create(401, 'Unauthorized'))
    }
    // let bookId = req.body.bookId
    // if (bookId !== 'number') {
    //     next(boom.create(400, 'Please enter a valid number'))
    // }
    // else
    {
        knex('favorites')
            .returning('*')
            .where('book_id', req.body.bookId)
            .del()
            .then((ret) => {
                delete ret[0].id;
                res.json(humps.camelizeKeys(ret[0]))
            })
    }

})

module.exports = router;
