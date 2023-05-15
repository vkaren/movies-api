require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  uri:
    process.env.ELEPHANTSQL_URL ||
    "postgres://postgres:5432@localhost/postgres",
};

module.exports = config;
