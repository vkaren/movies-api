const pool = require("../libs/postgres.pool");
const sequelize = require("../libs/sequelize");
const { models } = require("../libs/sequelize");

class MoviesService {
  constructor() {
    this.movies = [];
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async add({ title, genre, year, ranking = 0 }) {
    const movie = { title, genre, year, ranking };
    this.movies.push(movie);
    return movie;
  }

  async update(id, changes) {
    const movie = this.movies.find((movie) => movie.id === id);

    movie = {
      ...movie,
      ...changes,
    };

    return movie;
  }

  async find() {
    // const query = "SELECT * FROM movies";
    const res = await models.Movies.findAll(); //sequelize.query(query); // this.pool.query(query);
    return res; //res.rows;
    // return this.movies;
  }

  async findByTitle(title) {
    console.log(title, this.movies);
    return this.movies.find((movie) => movie.title === title);
  }

  async filterByGenre(genre) {
    return this.movies.filter((movie) => movie.genre === genre);
  }

  async filterByYear(year) {
    return this.movies.filter((movie) => movie.year == year);
  }

  async filterByRanking(ranking) {
    return this.movies.filter((movie) => movie.ranking === ranking);
  }

  async delete(id) {
    const movie = this.movies.findIndex((movie) => movie.id === id);
    this.movies.splice(movie, 1);
  }
}

module.exports = MoviesService;
