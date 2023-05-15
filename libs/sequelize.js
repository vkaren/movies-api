const { Sequelize } = require("sequelize");
const config = require("../config/config");
const setupModels = require("../db/models/index");

const URI = encodeURI(config.uri);

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: true,
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
