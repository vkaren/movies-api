const config = require("./../config/");

module.exports = {
  development: {
    url: config.uri,
    dialect: "postgres",
  },
  production: {
    url: config.uri,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
