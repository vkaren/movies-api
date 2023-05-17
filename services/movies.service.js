const pool = require("../libs/postgres.pool");
const { models } = require("../libs/sequelize");
const service = require("./genres.service");
const genresService = new service();

const boom = require("@hapi/boom");

class MoviesService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async create({ title, genres, year, ranking = 0, poster = "" }) {
    const movieData = { title, genres, year, ranking, poster };
    const movie = await models.Movie.create(movieData);

    genres.forEach(async (genre) => {
      try {
        const [genreId] = await models.Genre.findOrCreate({
          where: { name: genre },
          defaults: {
            name: genre,
          },
        });

        const addedMovie = await genresService.addMovie({
          genreId: genreId.dataValues.id,
          movieId: movie.id,
        });
      } catch (err) {
        console.log(err);
      }
    });

    return movie;
  }

  async update(id, changes) {
    const movie = await models.Movie.findByPk(id);
    if (!movie) {
      throw boom.notFound("movie not found");
    }
    const rta = await models.Movie.update(changes);
    return rta;
  }

  async find() {
    const res = await models.Movie.findAll();
    return res;
  }

  async findByTitle(title) {
    const movie = await models.Movie.findOne({
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
    const movies = await models.Movie.findAll(options);
    return movies;
  }

  async delete(id) {
    const movie = await models.Movie.findByPk(id);
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
