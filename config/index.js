require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  uri:
    process.env.DATABASE_URL || "postgres://postgres:5432@localhost/postgres",
  url: process.env.API_URL || "http://localhost:3000",
  port: process.env.PORT || 3000,
  filesRoute: process.env.FILES_ROUTE || "files",
};

module.exports = config;
