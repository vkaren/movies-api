const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");
const pool = require("../libs/postgres.pool");
const boom = require("@hapi/boom");
const service = require("./genres.service");
const GenresService = new service();

class MoviesService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async create({ title, genres, year, ranking = 0, poster = "" }) {
    const isMovieCreated = await models.Movie.findOne({
      where: {
        title,
      },
    });

    if (isMovieCreated) {
      throw boom.conflict(`${title} movie already exists`);
    }

    const movieData = {
      title,
      genres,
      ranking,
      poster,
      year,
    };

    const movie = await models.Movie.create(movieData);

    await this.addMovieToGenreList({ movie, genres });

    return movie;
  }

  async addMovieToGenreList({ movie, genres }) {
    genres.forEach(async (name) => {
      const genre = await models.Genre.findOne({
        where: { name },
        defaults: {
          name,
        },
      });

      if (genre) {
        await GenresService.addMovieToGenre({
          genreId: genre.dataValues.id,
          movieId: movie.id,
        });
      }
    });
  }

  async update({ id, year, genres, ...params }) {
    const movie = await models.Movie.findByPk(id);

    if (!movie) {
      throw boom.notFound(`This movie with ID number ${id} doesn't exist`);
    }

    const changes = { ...params };
    const haveGenresChanged =
      genres.length !== movie.dataValues.genres.length ||
      genres.some((genre, i) => genre !== movie.dataValues.genres[i]);

    if (year && year !== movie.dataValues.year) {
      changes.year = year;
    }

    if (genres && haveGenresChanged) {
      const genreMovieTables = await models.GenreMovie.findAll({
        where: { movieId: movie.dataValues.id },
      });

      genreMovieTables.forEach((genreMovie) => genreMovie.destroy());

      await this.addMovieToGenreList({ movie, genres });

      changes.genres = genres;
    }

    const rta = await models.Movie.update(changes, {
      where: { id },
      returning: true,
    });

    return rta;
  }

  async find({ limit, offset }) {
    const res = await models.Movie.findAll({
      limit,
      offset,
    });
    return res;
  }

  async findByTitle({ title }) {
    const movie = await models.Movie.findOne({
      where: {
        title,
      },
    });

    if (!movie) {
      throw boom.notFound(`${title} movie doesn't exist`);
    }

    return movie;
  }

  async filter({ genre = null, year = null, ranking = null, limit, offset }) {
    const query = {
      where: {},
      limit,
      offset,
    };

    if (genre) {
      query.where.genres = {
        [Op.contains]: [genre],
      };
    }

    if (year) {
      query.where.year = year;
    }

    if (ranking) {
      query.where.ranking = ranking;
    }

    const movies = await models.Movie.findAll(query);

    return movies;
  }

  async delete({ id }) {
    const movie = await models.Movie.findByPk(id);

    if (!movie) {
      throw boom.notFound(`This movie with ID number ${id} doesn't exist`);
    }
    await movie.destroy();

    return { deletedMovie: id };
  }
}

module.exports = MoviesService;
