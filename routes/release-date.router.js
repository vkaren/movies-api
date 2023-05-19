const ReleaseDateService = require("../services/release-date.service");
const express = require("express");
const router = express.Router();
const service = new ReleaseDateService();
const validatorHandler = require("../middlewares/validator.handler");
const {
  releaseDateSchema,
  updateReleaseDateSchema,
  getByIdSchema,
} = require("../schemas/release-date.schema");

router.get("/", async (req, res, next) => {
  try {
    const years = await service.find();
    res.json(years);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(releaseDateSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newYear = await service.create(body);
      res.json(newYear);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getByIdSchema, "params"),
  validatorHandler(updateReleaseDateSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const year = await service.update(id, body);
      res.json(year);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:year",
  validatorHandler(releaseDateSchema, "params"),
  async (req, res, next) => {
    try {
      const { year } = req.params;
      const yearFound = await service.findByYear(year);
      res.json(yearFound);
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
      const year = await service.delete(id);
      res.json({
        message: "deleted",
        year,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
