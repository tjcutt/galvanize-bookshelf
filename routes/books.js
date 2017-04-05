'use strict';

const express = require('express');
const knex = require('../knex');
const humps = require('humps');
const router = express.Router();

router.get('/books', (req, res, next) => {
  knex('books')
    .orderBy('title')
    .then(books => {
      res.send(humps.camelizeKeys(books));
    });
  });

router.get('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .then(books => {
      res.send(humps.camelizeKeys(books[0]));
    });
});

router.post('/books', (req, res, next) => {
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

router.patch('/books/:id', (req, res, next) => {
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
    .then(book => {
      res.send(humps.camelizeKeys(book[0]));
   })
  // next()

  //  .catch(() => {
  //  res.sendStatus(404)
  //  });
});

// router.get('/books/:id', (req, res, next) => {
//   res.render('error')
// });

router.delete('/books/:id', (req, res, next) => {
  knex('books')
    .returning(['title', 'author', 'genre', 'description', 'cover_url'])
    .where('id', req.params.id)
    .del()
    .then(book => {
      res.send(humps.camelizeKeys(book[0]));
    });
});

// =================== BONUS

// router.get('/books/:id', (req, res, next) => {
//   knex('books')
//      .whereNot('id', req.params.id)
//      .then(()=>{
//        res.status('404')
//      });
// })

module.exports = router;
