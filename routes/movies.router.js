const MoviesService = require("../services/movies.service");
const router = express.Router();
const service = new MoviesService();
const validatorHandler = require("../middlewares/validator.handler");
const {
  addMovieSchema,
  updateMovieSchema,
  getByIdSchema,
  getByTitleSchema,
  getByGenreSchema,
  getByYearSchema,
  getByRankingSchema,
} = require("../schemas/movies.schema");

router.get("/", validatorHandler(), async (req, res, next) => {
  try {
    const movies = await service.find();
    res.json(/**db movies */);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/genre/:genre",
  validatorHandler(getByGenreSchema, "params"),
  async (req, res, next) => {
    try {
      const { genre } = req.params;
      const movies = await service.filterByGenre(genre);
      res.json(/**db movies */);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/title/:title",
  validatorHandler(getByTitleSchema, "params"),
  async (req, res, next) => {
    try {
      const { title } = req.params;
      const movie = await service.findByTitle(title);
      res.json(/**db movies */);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/year/:year",
  validatorHandler(getByYearSchema, "params"),
  async (req, res, next) => {
    try {
      const { year } = req.params;
      const movies = await service.filterByYear(year);
      res.json(/**db movies */);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/ranking/:ranking",
  validatorHandler(getByRankingSchema, "params"),
  async (req, res, next) => {
    try {
      const { ranking } = req.params;
      const movies = await service.filterByRanking(ranking);
      res.json(/**db movies */);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/movie",
  validatorHandler(addMovieSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newMovie = await service.add(body);
      // res.json(/**db movies */)
      // añade una peli
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/movie/:id",
  validatorHandler(getByIdSchema, "params"),
  validatorHandler(updateMovieSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const movie = await service.update(id, body);
      // res.json(/**db movies */)
      // modifica una peli
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/movie/:id",
  validatorHandler(getByIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await service.delete(id);
      res.json({
        message: "deleted",
        id,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
