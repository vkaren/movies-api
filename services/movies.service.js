const pool = require("../libs/postgres.pool");
const sequelize = require("../libs/sequelize");
const { models } = require("../libs/sequelize");

const boom = require("@hapi/boom");

class MoviesService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async create({ title, genre, year, ranking = 0, poster }) {
    const movieData = { title, genre, year, ranking, poster };
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
    const movie = await models.Movies.findByPk(id);
    let movieDeleted;
    if (!movie) {
      throw boom.notFound("movie not found");
    }
    movieDeleted = movie;
    await movie.destroy();
    return movieDeleted;
  }
}

module.exports = MoviesService;
