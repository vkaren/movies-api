const { Model, DataTypes } = require("sequelize");

const MOVIE_TABLE = "movies";

const MovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  year: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  genres: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  ranking: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  poster: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class Movie extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: "Movie",
      timestamps: false,
    };
  }
}

module.exports = { MOVIE_TABLE, MovieSchema, Movie };
