const Joi = require("joi");

const id = Joi.number().integer();
const title = Joi.string();
const genres = Joi.array();
const ranking = Joi.number().integer();
const poster = Joi.string().uri();
const year = Joi.number().integer().min(1895).max(2024);
const genre = Joi.string();

const addMovieSchema = Joi.object({
  title: title.required(),
  genres: genres.required(),
  year: year.required(),
  ranking,
  poster,
});

const updateMovieSchema = Joi.object({
  title,
  genres,
  ranking,
  poster,
  year,
});

const getByIdSchema = Joi.object({
  id: id.required(),
});

const getByTitleSchema = Joi.object({
  title: title.required(),
});

const filterBy = Joi.object({
  genre,
  year,
  ranking,
});

module.exports = {
  addMovieSchema,
  updateMovieSchema,
  getByIdSchema,
  getByTitleSchema,
  filterBy,
};
