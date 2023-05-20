const GenresService = require("../services/genres.service");
const express = require("express");
const router = express.Router();
const service = new GenresService();
const validatorHandler = require("../middlewares/validator.handler");
const { genreSchema, getByIdsSchema } = require("../schemas/genres.schema");

router.get("/", async (req, res, next) => {
  try {
    const genres = await service.find();
    res.json(genres);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(genreSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newGenre = await service.create(body);
      res.json(newGenre);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add-movie/:genreId/:movieId",
  validatorHandler(getByIdsSchema, "params"),
  async (req, res, next) => {
    try {
      const { genreId, movieId } = req.params;
      const addedMovie = await service.addMovie({ genreId, movieId });
      res.json(addedMovie);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:name",
  validatorHandler(genreSchema, "params"),
  async (req, res, next) => {
    try {
      const { name } = req.params;
      const genre = await service.findByName(name);
      res.json(genre);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
