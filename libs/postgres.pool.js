const { Pool } = require("pg");

const conString =
  process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";
const pool = new Pool(conString);

module.exports = pool;
