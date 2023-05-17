const MoviesService = require("../services/movies.service");
const express = require("express");
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

router.get("/", async (req, res, next) => {
  try {
    const movies = await service.find();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(addMovieSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newMovie = await service.create(body);
      res.json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getByIdSchema, "params"),
  validatorHandler(updateMovieSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const movie = await service.update(id, body);
      res.json(movie);
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
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);

// router.get(
//   "/genre/:genre",
//   validatorHandler(getByGenreSchema, "params"),
//   async (req, res, next) => {
//     try {
//       const { genre } = req.params;
//       const movies = await service.filter(
//         { attribute: "genre", value: genre },
//         req.query
//       );
//       res.json(movies);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.get(
  "/year/:year",
  validatorHandler(getByYearSchema, "params"),
  async (req, res, next) => {
    try {
      const { year } = req.params;
      const movies = await service.filter(
        { attribute: "year", value: year },
        req.query
      );
      res.json(movies);
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
      const movies = await service.filter(
        {
          attribute: "ranking",
          value: ranking,
        },
        req.query
      );
      res.json(movies);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getByIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await service.delete(id);
      res.json({
        message: "deleted",
        movie,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
