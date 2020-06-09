import { Sequelize } from '../models';
const { Op } = Sequelize;
class Parametrizer {
  static getOptions(query, attributes) {
    let { filter, sortField, sortDirection } = query;
    const limit = +query.pageSize || 0;

    let where = {
      active: {
        [Op.eq]: true
      },
    };

    const page = +query.pageNumber || 0;
    const offset = (page) * limit;
    const opts = {
      attributes,
      order: [
        [sortField, sortDirection],
      ],
    }
    !query.active ? null : opts.where

    if (limit > 0) {
      opts.offset = offset;
      opts.limit = limit;
    }
    return opts;
  }
  static responseOk(data, { limit }) {
    const { count, rows } = data;
    const pages = Math.ceil(count / limit);
    return {
      ok: true,
      payload: rows,
      count,
      pages,
    };
  }
}

export default Parametrizer;
