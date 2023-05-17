const pool = require("../libs/postgres.pool");
const { models } = require("../libs/sequelize");

const boom = require("@hapi/boom");

class YearsService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  async create({ year }) {
    const data = { year };
    const newYear = await models.Year.create(data);
    return newYear;
  }

  async update(id, changes) {
    const year = await models.Year.findByPk(id);
    if (!year) {
      throw boom.notFound("year not found");
    }
    const rta = await models.Year.update(changes);
    return rta;
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

  async delete(id) {
    const year = await models.Year.findByPk(id);
    let yearDeleted;
    if (!year) {
      throw boom.notFound("year not found");
    }
    yearDeleted = year;
    await year.destroy();
    return yearDeleted;
  }
}

module.exports = YearsService;
