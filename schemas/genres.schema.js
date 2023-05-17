const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();

const genreSchema = Joi.object({
  name: name.required(),
});

const updateGenreSchema = Joi.object({
  name,
});

const getByIdSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  genreSchema,
  updateGenreSchema,
  getByIdSchema,
};
