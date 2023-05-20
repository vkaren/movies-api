const YearService = require("../services/year.service");
const express = require("express");
const router = express.Router();
const service = new YearService();
const validatorHandler = require("../middlewares/validator.handler");
const { yearSchema } = require("../schemas/year.schema");

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
  validatorHandler(yearSchema, "body"),
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

router.get(
  "/:year",
  validatorHandler(yearSchema, "params"),
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

module.exports = router;
