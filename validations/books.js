'use strict';

const Joi = require('joi');

module.exports.patch = {
    body: {
        title: Joi.string()
            .label('title')
            .required()
            .trim(),
        author: Joi.string()
            .label('author')
            .required()
            .trim(),
        genre: Joi.string()
            .label('genre')
            .required()
            .trim(),
        description: Joi.string()
            .label('description')
            .required()
            .trim(),
        coverUrl: Joi.string()
            .label('cover_url')
            .required()
            .trim()
    }
};
