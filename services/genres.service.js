const pool = require("../libs/postgres.pool");
const { models } = require("../libs/sequelize");

const boom = require("@hapi/boom");

class GenresService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async create({ name }) {
    const isGenreCreated = await models.Genre.findOne({
      where: { name },
    });

    if (isGenreCreated) {
      throw boom.conflict(`${name} genre already exists`);
    }
    const genre = await models.Genre.create({ name });
    return genre;
  }

  async addMovieToGenre({ genreId, movieId }) {
    const movie = await models.Movie.findByPk(movieId);
    const genre = await models.Genre.findByPk(genreId);

    if (!movie) {
      throw boom.notFound("movie not found");
    }

    if (!genre) {
      throw boom.notFound("genre not found");
    }

    const addedMovie = await models.GenreMovie.create({ genreId, movieId });

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

  async findByName({ name }) {
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
      throw boom.notFound(`${name} genre doesn't exist`);
    }

    return genre;
  }
}

module.exports = GenresService;
