const express = require("express");
const router = express.Router();
const MoviesService = require("../services/movies.service");
const service = new MoviesService();
const { upload } = require("../libs/multer");
const validatorHandler = require("../middlewares/validator.handler");
const {
  addMovieSchema,
  updateMovieSchema,
  getByIdSchema,
  getByTitleSchema,
  filterBy,
} = require("../schemas/movies.schema");

router.get("/", async (req, res, next) => {
  try {
    const movies = await service.find(req.query);
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/title/:title",
  validatorHandler(getByTitleSchema, "params"),
  async (req, res, next) => {
    try {
      const movie = await service.findByTitle(req.params);
      res.status(200).json(movie);
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
      const movies = await service.filter(req.query);
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  upload.single("poster"),
  validatorHandler(addMovieSchema, "body", true),
  async (req, res, next) => {
    try {
      const newMovie = await service.create({
        ...req.body,
        poster: req.file?.filename || null,
      });
      res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getByIdSchema, "params"),
  validatorHandler(updateMovieSchema, "body", true),
  async (req, res, next) => {
    try {
      const movie = await service.update({ ...req.params, ...req.body });
      res.status(200).json(movie);
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
      const deletedMovie = await service.delete(req.params);
      res.status(200).json(deletedMovie);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
