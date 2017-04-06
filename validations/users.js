'use strict';

const Joi = require('joi');

module.exports.post = {
    body: {
        email: Joi.string()
            .label('email')
            .email()
            .required()
            .trim(),

        password: Joi.string()
            .label('password')
            .required()
            .min(8)
    }
};
