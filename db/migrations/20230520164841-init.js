"use strict";
const { MOVIE_TABLE, MovieSchema } = require("../models/movie.model");
const { GENRE_TABLE, GenreSchema } = require("../models/genre.model");
const {
  GENRE_MOVIE_TABLE,
  GenreMovieSchema,
} = require("../models/genre-movie.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(MOVIE_TABLE, MovieSchema);
    await queryInterface.createTable(GENRE_TABLE, GenreSchema);
    await queryInterface.createTable(GENRE_MOVIE_TABLE, GenreMovieSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(MOVIE_TABLE);
    await queryInterface.dropTable(GENRE_TABLE);
    await queryInterface.dropTable(GENRE_MOVIE_TABLE);
  },
};
