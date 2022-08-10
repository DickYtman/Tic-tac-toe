const Joi = require("joi")

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
})

export default signupSchema