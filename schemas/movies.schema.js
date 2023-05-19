const Joi = require("joi");

const id = Joi.number().integer();
const title = Joi.string();
const genres = Joi.array();
const genre = Joi.string();
const year = Joi.number().integer().min(1895).max(2024);
const ranking = Joi.number().integer();
const poster = Joi.string().uri();
// const yearId = Joi.number().integer();

const addMovieSchema = Joi.object({
  title: title.required(),
  genres: genres.required(),
  year: year.required(),
  ranking,
  poster,
  // yearId,
});

const updateMovieSchema = Joi.object({
  title,
  genres,
  year,
  ranking,
  poster,
});

const getByIdSchema = Joi.object({
  id: id.required(),
});

const filterBy = Joi.object({
  genre,
  year,
  ranking,
});

const getByTitleSchema = Joi.object({
  title: title.required(),
});

module.exports = {
  addMovieSchema,
  updateMovieSchema,
  getByIdSchema,
  getByTitleSchema,
  filterBy,
};
