const { Model, DataTypes } = require("sequelize");

const { GENRE_TABLE } = require("./genre.model");
const { MOVIE_TABLE } = require("./movie.model");

const GENRE_MOVIE_TABLE = "genre_movie";

const GenreMovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  genreId: {
    field: "genre_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GENRE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  movieId: {
    field: "movie_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MOVIE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class GenreMovie extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GENRE_MOVIE_TABLE,
      modelName: "GenreMovie",
      timestamps: false,
    };
  }
}

module.exports = { GenreMovie, GenreMovieSchema, GENRE_MOVIE_TABLE };
