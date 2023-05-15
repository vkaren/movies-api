const pool = require("../libs/postgres.pool");
const sequelize = require("../libs/sequelize");
const { models } = require("../libs/sequelize");

const boom = require("@hapi/boom");

class MoviesService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async add({ title, genre, year, ranking = 0, poster }) {
    const movieData = { id: 1, title, genre, year, ranking, poster };
    console.log(movieData);
    const movie = await models.Movies.create(movieData);
    return movie;
  }

  async update(id, changes) {
    const movie = await models.Movies.findByPk(id);
    const rta = await movie.update(changes);
    return rta;
  }

  async find() {
    const res = await models.Movies.findAll();
    return res;
  }

  async findByTitle(title) {
    const movie = await models.Movies.findOne({
      where: {
        title,
      },
    });
    if (!movie) {
      throw boom.notFound("movie not found");
    }
    return movie;
  }

  async filter({ attribute, value }, { limit = 20, offset = 0 }) {
    const options = {
      where: {
        [attribute]: value,
      },
      limit,
      offset,
    };
    const movies = await models.Movies.findAll(options);
    return movies;
  }

  async delete(id) {
    const movie = await models.Movies.findOne(id);
    if (!movie) {
      throw boom.notFound("movie not found");
    }
    await movie.destroy();
    return { id };
  }
}

module.exports = MoviesService;
