const { Joi } = require("express-validation");

const socialEditUser = {
  body: Joi.object({
    name: Joi.string().optional(),
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    age: Joi.number().optional(),
    image: Joi.string().optional(),
  }),
};

module.exports = { socialEditUser };
