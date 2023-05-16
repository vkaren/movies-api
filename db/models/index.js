const { Movies, MovieSchema } = require("./movie.model");
const { Genres, GenreSchema } = require("./genre.model");
const { GenreMovie, GenreMovieSchema } = require("./genre-movie.model");

function setupModels(sequelize) {
  Movies.init(MovieSchema, Movies.config(sequelize));
  Genres.init(GenreSchema, Genres.config(sequelize));
  GenreMovie.init(GenreMovieSchema, GenreMovie.config(sequelize));

  Genres.associate(sequelize.models);
}

module.exports = setupModels;
