const moviesRouter = require("./movies.router");
const genresRouter = require("./genre.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/movies", moviesRouter);
  router.use("/genres", genresRouter);
}

module.exports = routerApi;
