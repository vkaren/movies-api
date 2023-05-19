const Joi = require("joi");

const id = Joi.number().integer();
const year = Joi.number().integer();

const releaseDateSchema = Joi.object({
  year: year.required(),
});

const updateReleaseDateSchema = Joi.object({
  year,
});

const getByIdSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  releaseDateSchema,
  updateReleaseDateSchema,
  getByIdSchema,
};
