const { Client } = require("pg");
const config = require("../config/config");

const URI = encodeURI(config.uri);

async function getConnection() {
  const client = new Client(URI);
  await client.connect();
  return client;
}

module.exports = getConnection;
