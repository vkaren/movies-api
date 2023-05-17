const pool = require("../libs/postgres.pool");
const sequelize = require("../libs/sequelize");
const { models } = require("../libs/sequelize");

const boom = require("@hapi/boom");

class GenresService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async create({ name }) {
    const data = { name };
    const genre = await models.Genres.create(data);
    return genre;
  }

  async addMovie({ genreId, movieId }) {
    const data = { genreId, movieId };
    const genre = models.Genres.findByPk(genreId);

    if (!genre) {
      throw boom.notFound("genre not found");
    }

    const addedMovie = await models.GenreMovie.create(data);
    return addedMovie;
  }

  async find() {
    const res = await models.Genres.findAll();
    return res;
  }

  async findByName(name) {
    const genre = await models.Genres.findOne({
      where: { name },
      include: ["movies"],
    });
    return genre;
  }

  async delete(id) {
    const genre = await models.Genres.findByPk(id);
    let genreDeleted;
    if (!genre) {
      throw boom.notFound("genre not found");
    }
    genreDeleted = genre;
    await genre.destroy();
    return genreDeleted;
  }
}

module.exports = GenresService;
