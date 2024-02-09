const express = require("express");
const router = express.Router();
const GenresService = require("../services/genres.service");
const service = new GenresService();
const { genreSchema } = require("../schemas/genres.schema");
const validatorHandler = require("../middlewares/validator.handler");

router.get("/", async (req, res, next) => {
  try {
    const genres = await service.find();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:name",
  validatorHandler(genreSchema, "params"),
  async (req, res, next) => {
    try {
      const genre = await service.findByName(req.params);
      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(genreSchema, "body"),
  async (req, res, next) => {
    try {
      const newGenre = await service.create(req.body);
      res.status(201).json(newGenre);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
