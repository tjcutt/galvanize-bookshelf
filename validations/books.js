'use strict';

module.exports.post = {
    body: {
        title: Joi.string
            .label(title)
            .required()
            .string()
            .max(255)
            .trim()
        author: Joi.string
            .label(author)
            .required()
            .string()
            .max(255)
            .trim()
        genre: Joi.string
            .label(genre)
            .required()
            .string()
            .max(255)
            .trim()
        description: Joi.string
            .label(description)
            .required()
            .string()
            .max(255)
            .trim()
        cover_url: Joi.string
            .label(cover_url)
            .required()
            .string()
            .trim()
    }
};
