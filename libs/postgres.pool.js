const { Pool } = require("pg");
const config = require("../config/config");

const URI = encodeURI(config.uri);
const pool = new Pool({ connectionString: URI });

module.exports = pool;
