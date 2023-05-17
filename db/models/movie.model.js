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
  genres: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  year: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ranking: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  poster: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Movie extends Model {
  static associate() {
    // models
  }

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
