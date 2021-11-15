const { Joi } = require("express-validation");

const userValidation = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    name: Joi.string().required(),
    photo: Joi.string().required(),
    bio: Joi.string().required(),
  }),
};

module.exports = userValidation;
