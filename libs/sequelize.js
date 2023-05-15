const { Sequelize } = require("sequelize");
const config = require("../config/config");

const URI = encodeURI(config.uri);

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: true,
});

module.exports = sequelize;
