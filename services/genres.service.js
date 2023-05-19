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
    const genre = await models.Genre.create(data);
    return genre;
  }

  async update(id, changes) {
    const genre = await models.Genre.findByPk(id);
    if (!genre) {
      throw boom.notFound("genre not found");
    }
    const rta = await models.Genre.update(changes);
    return rta;
  }

  async addMovie({ genreId, movieId }) {
    const data = { genreId, movieId };
    const genre = models.Genre.findByPk(genreId);

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
          include: {
            model: models.ReleaseDate,
            as: "release_date",
            attributes: ["year"],
          },
        },
      ],
    });
    return res;
  }

  async findByName(name) {
    const genre = await models.Genre.findOne({
      where: { name },
      include: ["movies"],
    });

    if (!genre) {
      throw boom.notFound("genre not found");
    }

    return genre;
  }

  async delete(id) {
    const genre = await models.Genre.findByPk(id);
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
