const { Model, DataTypes } = require("sequelize");
const { YEAR_TABLE } = require("./year.model");

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
  yearId: {
    field: "year_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: YEAR_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Movie extends Model {
  static associate(models) {
    this.belongsTo(models.Year, { foreignKey: "id", as: "yearModel" });
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
