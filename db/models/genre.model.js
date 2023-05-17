const { Model, DataTypes } = require("sequelize");
const GENRE_TABLE = "genres";

const GenreSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
};

class Genre extends Model {
  static associate(models) {
    this.belongsToMany(models.Movie, {
      as: "movies",
      through: models.GenreMovie,
      foreignKey: "genreId",
      otherKey: "movieId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GENRE_TABLE,
      modelName: "Genre",
      timestamps: false,
    };
  }
}

module.exports = { GENRE_TABLE, GenreSchema, Genre };
