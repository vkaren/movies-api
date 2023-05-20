const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();

const genreSchema = Joi.object({
  name: name.required(),
});

const getByIdsSchema = Joi.object({
  genreId: id.required(),
  movieId: id.required(),
});

module.exports = {
  genreSchema,
  getByIdsSchema,
};
