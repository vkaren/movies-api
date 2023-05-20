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
    const isMovieCreated = await models.Movie.findOne({
      where: {
        title,
      },
    });

    if (isMovieCreated) {
      throw boom.notFound(`${title} movie already exists`);
    }

    // find or create the year and get the id
    const [yearId] = await models.Year.findOrCreate({
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
      year,
      yearId: yearId.dataValues.id,
    };

    const movie = await models.Movie.create(movieData);

    // find or create all the genres, get the id and add the movie created to the genre
    genres.forEach(async (genreName) => {
      const [genre] = await models.Genre.findOrCreate({
        where: { name: genreName },
        defaults: {
          name: genreName,
        },
      });

      await genresService.addMovie({
        genreId: genre.dataValues.id,
        movieId: movie.id,
      });
    });

    return movie;
  }

  async update(id, { year, genres, ...params }) {
    const movie = await models.Movie.findByPk(id);
    if (!movie) {
      throw boom.notFound("movie not found");
    }

    const changes = { ...params };

    if (year && year !== movie.dataValues.year) {
      const [yearId] = await models.Year.findOrCreate({
        where: { year },
        defaults: {
          year,
        },
      });
      changes.year = year;
      changes.yearId = yearId.dataValues.id;
    }

    const isGenresChange =
      genres.length !== movie.dataValues.genres.length ||
      genres.some((genre, i) => genre !== movie.dataValues.genres[i]);

    if (genres && isGenresChange) {
      const genreMovie = await models.GenreMovie.findAll({
        where: { movieId: movie.dataValues.id },
      });

      genreMovie.forEach((genreM) => genreM.destroy());

      genres.forEach(async (genreName) => {
        const [genre] = await models.Genre.findOrCreate({
          where: { name: genreName },
          defaults: {
            name: genreName,
          },
        });

        await genresService.addMovie({
          genreId: genre.dataValues.id,
          movieId: movie.id,
        });
      });

      changes.genres = genres;
    }

    const rta = await models.Movie.update(changes, {
      where: { id },
      returning: true,
    });

    return rta;
  }

  async find(pagination) {
    try {
      const res = await models.Movie.findAll({
        limit: pagination.limit,
        offset: pagination.offset,
      });
      return res;
    } catch (err) {
      console.log(err);
    }
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
