const Joi = require("joi");

const id = Joi.string().uuid();
const title = Joi.string().alphanum();
const genre = Joi.string().alphanum();
const year = Joi.string().integer();
const ranking = Joi.number().integer();
const poster = Joi.string().uri();

const addMovieSchema = Joi.object({
  title: title.required(),
  genre: genre.required(),
  year: year.required(),
  ranking: ranking.required(),
  poster: poster.required(),
});

const updateMovieSchema = Joi.object({
  title,
  genre,
  year,
  ranking,
  poster,
});

const getByIdSchema = Joi.object({
  id: id.required(),
});

const getByTitleSchema = Joi.object({
  title: title.required(),
});

const getByGenreSchema = Joi.object({
  genre: genre.required(),
});

const getByYearSchema = Joi.object({
  year: year.required(),
});

const getByRankingSchema = Joi.object({
  ranking: ranking.required(),
});

module.exports = {
  addMovieSchema,
  updateMovieSchema,
  getByIdSchema,
  getByTitleSchema,
  getByGenreSchema,
  getByYearSchema,
  getByRankingSchema,
};