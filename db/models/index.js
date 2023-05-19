const { Movie, MovieSchema } = require("./movie.model");
const { Genre, GenreSchema } = require("./genre.model");
const { GenreMovie, GenreMovieSchema } = require("./genre-movie.model");
const { ReleaseDate, ReleaseDateSchema } = require("./release-date.model");

function setupModels(sequelize) {
  Movie.init(MovieSchema, Movie.config(sequelize));
  Genre.init(GenreSchema, Genre.config(sequelize));
  GenreMovie.init(GenreMovieSchema, GenreMovie.config(sequelize));
  ReleaseDate.init(ReleaseDateSchema, ReleaseDate.config(sequelize));

  Movie.associate(sequelize.models);
  Genre.associate(sequelize.models);
  ReleaseDate.associate(sequelize.models);
}

module.exports = setupModels;
