const { Model, DataTypes } = require("sequelize");
const YEAR_TABLE = "years";

const YearSchema = {
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

class Year extends Model {
  static associate(models) {
    this.hasMany(models.Movie, {
      as: "movies",
      foreignKey: "yearId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: YEAR_TABLE,
      modelName: "Year",
      timestamps: false,
    };
  }
}

module.exports = { YEAR_TABLE, YearSchema, Year };
