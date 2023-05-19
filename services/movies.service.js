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
    try {
      const [yearId] = await models.ReleaseDate.findOrCreate({
        where: { year },
        defaults: {
          year,
        },
      });

      const movieData = {
        title,
        genres,
        ranking,
        poster,
        releaseDateId: yearId.dataValues.id,
      };

      const movie = await models.Movie.create(movieData);

      genres.forEach(async (genre) => {
        const [genreId] = await models.Genre.findOrCreate({
          where: { name: genre },
          defaults: {
            name: genre,
          },
        });

        await genresService.addMovie({
          genreId: genreId.dataValues.id,
          movieId: movie.id,
        });
      });

      return movie;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, changes) {
    const movie = await models.Movie.findByPk(id);
    if (!movie) {
      throw boom.notFound("movie not found");
    }
    const rta = await models.Movie.update(changes, { where: { id } });
    return rta;
  }

  async find(pagination) {
    const res = await models.Movie.findAll({
      include: [
        {
          model: models.ReleaseDate,
          as: "release_date",
          attributes: ["year"],
        },
      ],
      limit: pagination.limit,
      offset: pagination.offset,
    });
    console.log(res);
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

  async filter(data, pagination) {
    const options = {
      where: data,
      limit: pagination.limit,
      offset: pagination.offset,
    };
    const movies = await models.Movie.findAll(options);
    return movies;
  }

  async delete(id) {
    try {
      const movie = await models.Movie.findByPk(id);
      let movieDeleted;
      if (!movie) {
        throw boom.notFound("movie not found");
      }
      movieDeleted = movie;
      const a = await movie.destroy();
      console.log(movieDeleted, a);
      return movieDeleted;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MoviesService;
