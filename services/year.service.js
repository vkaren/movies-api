const pool = require("../libs/postgres.pool");
const { models } = require("../libs/sequelize");

const boom = require("@hapi/boom");

class YearService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async create({ year }) {
    const data = { year };
    const isYearCreated = await this.findByYear(year);

    if (isYearCreated) {
      throw boom.notFound(`year ${year} already exists`);
    }
    const newYear = await models.Year.create(data);
    return newYear;
  }

  async find() {
    const res = await models.Year.findAll({
      include: ["movies"],
    });
    return res;
  }

  async findByYear(yearParam) {
    const year = await models.Year.findOne({
      where: { year: yearParam },
      include: ["movies"],
    });

    if (!year) {
      throw boom.notFound("year not found");
    }

    return year;
  }
}

module.exports = YearService;
