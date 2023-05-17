const Joi = require("joi");

const id = Joi.number().integer();
const title = Joi.string();
const genres = Joi.array();
const year = Joi.number().integer().min(1895).max(2024);
const ranking = Joi.number().integer();
const poster = Joi.string().uri();

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
  genres: genres.required(),
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
