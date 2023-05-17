const GenresService = require("../services/genres.service");
const express = require("express");
const router = express.Router();
const service = new GenresService();
const validatorHandler = require("../middlewares/validator.handler");
const {
  genreSchema,
  updateGenreSchema,
  getByIdSchema,
} = require("../schemas/genres.schema");

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
      const newGenre = await service.add(body);
      res.json(newGenre);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add-movie/:genre-id/:movie-id",
  validatorHandler(getByIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { "genre-id": genreId, "movie-id": movieId } = req.params;
      const addedMovie = await service.addMovie(genreId, movieId);
      res.json(addedMovie);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getByIdSchema, "params"),
  validatorHandler(updateGenreSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const genre = await service.update(id, body);
      res.json(genre);
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

router.delete(
  "/:id",
  validatorHandler(getByIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const genre = await service.delete(id);
      res.json({
        message: "deleted",
        genre,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
