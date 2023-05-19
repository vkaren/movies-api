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
  filterBy,
} = require("../schemas/movies.schema");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const pagination = { limit, offset };
    const movies = await service.find(pagination);
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

router.get(
  "/filter",
  validatorHandler(filterBy, "query"),
  async (req, res, next) => {
    try {
      const {
        genre = null,
        year = null,
        ranking = null,
        limit,
        offset,
      } = req.query;
      const pagination = { limit, offset };
      const data = {};

      if (genre) {
        data.genres = {
          [Op.contains]: [genre],
        };
      }

      if (year) {
        data.year = year;
      }

      if (ranking) {
        data.ranking = ranking;
      }

      const movies = await service.filter(data, pagination);
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
