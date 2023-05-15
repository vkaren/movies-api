const { Movies, MovieSchema } = require("./movie.model");

function setupModels(sequelize) {
  Movies.init(MovieSchema, Movies.config(sequelize));
}

module.exports = setupModels;
