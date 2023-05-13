const { Client } = require("pg");

const conString = process.env.ELEPHANTSQL_URL  || "postgres://postgres:5432@localhost/postgres";

async function getConnection() {
  const client = new Client(conString);
  await client.connect();
  return client;
}

module.exports = getConnection;
