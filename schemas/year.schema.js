const Joi = require("joi");

const id = Joi.number().integer();
const year = Joi.number().integer().min(1895).max(2024);

const yearSchema = Joi.object({
  year: year.required(),
});

const updateYearSchema = Joi.object({
  year,
});

const getByIdSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  yearSchema,
  updateYearSchema,
  getByIdSchema,
};
