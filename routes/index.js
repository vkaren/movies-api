const express = require("express");

const moviesRouter = require("./movies.router");
const genresRouter = require("./genre.router");
const yearRouter = require("./release-date.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/movies", moviesRouter);
  router.use("/genres", genresRouter);
  router.use("/year", yearRouter);
}

module.exports = routerApi;
