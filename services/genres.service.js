const pool = require("../libs/postgres.pool");
const { models } = require("../libs/sequelize");

const boom = require("@hapi/boom");

class GenresService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async create({ name }) {
    const data = { name };
    const isGenreCreated = await this.findByName(name);

    if (isGenreCreated) {
      throw boom.notFound(`${name} genre already exists`);
    }
    const genre = await models.Genre.create(data);
    return genre;
  }

  async addMovie({ genreId, movieId }) {
    const data = { genreId, movieId };
    const movie = await models.Movie.findByPk(movieId);
    const genre = await models.Genre.findByPk(genreId);

    if (!movie) {
      throw boom.notFound("movie not found");
    }

    if (!genre) {
      throw boom.notFound("genre not found");
    }

    const addedMovie = await models.GenreMovie.create(data);

    return addedMovie;
  }

  async find() {
    const res = await models.Genre.findAll({
      include: [
        {
          model: models.Movie,
          as: "movies",
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res;
  }

  async findByName(name) {
    const genre = await models.Genre.findOne({
      where: { name },
      include: [
        {
          model: models.Movie,
          as: "movies",
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!genre) {
      throw boom.notFound("genre not found");
    }

    return genre;
  }
}

module.exports = GenresService;
