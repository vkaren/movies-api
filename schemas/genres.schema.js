const Joi = require("joi");

const name = Joi.string();

const genreSchema = Joi.object({
  name: name.required(),
});

module.exports = {
  genreSchema,
};
