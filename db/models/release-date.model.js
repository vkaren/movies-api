const { Model, DataTypes } = require("sequelize");
const RELEASE_DATE_TABLE = "release_date";

const ReleaseDateSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  year: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

class ReleaseDate extends Model {
  static associate(models) {
    this.hasMany(models.Movie, {
      as: "movies",
      foreignKey: "releaseDateId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RELEASE_DATE_TABLE,
      modelName: "ReleaseDate",
      timestamps: false,
    };
  }
}

module.exports = { RELEASE_DATE_TABLE, ReleaseDateSchema, ReleaseDate };
