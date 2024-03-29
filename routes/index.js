const express = require("express");

const moviesRouter = require("./movies.router");
const genresRouter = require("./genre.router");

function routerApi(app) {
  const router = express.Router();

  app.use("/api/v2", router);

  router.use("/movies", moviesRouter);
  router.use("/genres", genresRouter);
}

module.exports = routerApi;
