"use strict";
exports.__esModule = true;
var Joi = require("joi");
var signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required()
});
exports["default"] = signupSchema;
