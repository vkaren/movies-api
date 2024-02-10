const Joi = require("joi");

const GenresService = require("../services/genres.service");
const genreService = new GenresService();

const checkValidGenres = async (data) => {
  const validGenres = (await genreService.find()).map((genre) => genre.name);

  data.forEach((genre) => {
    if (!validGenres.includes(genre)) {
      throw new Error(`${genre} genre doesn't exist`);
    }
  });
};

const custom = Joi.extend({
  type: "array",
  base: Joi.array(),
  coerce: {
    from: "string",
    method(value, helpers) {
      if (typeof value === "string") {
        try {
          return { value: JSON.parse(value) };
        } catch (err) {}
      }

      return;
    },
  },
});

const id = Joi.number().integer();
const title = Joi.string();
const genre = Joi.string();
const genres = custom.array().items(genre).external(checkValidGenres);
const ranking = Joi.number().integer();
const poster = Joi.string().uri();
const year = Joi.number().integer().min(1895).max(2024);

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
