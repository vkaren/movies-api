const moviesRouter = require("./movies.router");

function routerApi(app) {
  app.use("/movies", moviesRouter);
}

module.exports = routerApi;
