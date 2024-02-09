const boom = require("@hapi/boom");

function validatorHandler(schema, property, isAsync = false) {
  return async (req, res, next) => {
    const data = req[property];

    if (isAsync) {
      try {
        await schema.validateAsync(data, { abortEarly: false });
      } catch (error) {
        next(boom.badRequest(error));
      }
    } else {
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        next(boom.badRequest(error));
      }
    }

    next();
  };
}

module.exports = validatorHandler;
