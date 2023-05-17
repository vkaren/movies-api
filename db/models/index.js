const { Movie, MovieSchema } = require("./movie.model");
const { Genre, GenreSchema } = require("./genre.model");
const { GenreMovie, GenreMovieSchema } = require("./genre-movie.model");

function setupModels(sequelize) {
  Movie.init(MovieSchema, Movie.config(sequelize));
  Genre.init(GenreSchema, Genre.config(sequelize));
  GenreMovie.init(GenreMovieSchema, GenreMovie.config(sequelize));

  Genre.associate(sequelize.models);
}

module.exports = setupModels;
