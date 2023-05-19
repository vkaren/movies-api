const { Model, DataTypes } = require("sequelize");
const { RELEASE_DATE_TABLE } = require("./release-date.model");

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
  ranking: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  poster: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  releaseDateId: {
    field: "release_date_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: RELEASE_DATE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Movie extends Model {
  static associate(models) {
    this.belongsTo(models.ReleaseDate, { as: "release_date" });
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
