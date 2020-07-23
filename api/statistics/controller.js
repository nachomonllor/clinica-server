import db from '../../models'
import { Sequelize, sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
import _ from 'lodash'
import async from 'async';

class StatisticsController {
  static Fetch(req, res) {
    const { Op } = Sequelize
    async.waterfall([
      function (done) {
        db.Appointment.findAndCountAll({
          attributes: ['Category.id', [sequelize.fn('count', sequelize.col('Category.id')), 'cnt']],
          include: [{
            model: db.Category
          }],
          group: ['CategoryId', 'Category.id'],
        })
          .then(data => {
            done(null, data.rows)
            // res.status(200).json(data.rows)
          })
          .catch((err) => {
            throw err;
          })
      },
      function( opByCategory, done) {
        db.Appointment.findAndCountAll({
          attributes: [
            [Sequelize.literal(`extract(DOW FROM "appointmentDate")`), 'day'],
            [Sequelize.literal(`COUNT(*)`), 'cnt']
          ],
          group:[Sequelize.literal(`extract(DOW FROM "appointmentDate")`)]
        })
          .then(data => {
            // done(null, data.rows)
            res.status(200).json({
                opByCategory,
                appointmentByDayOfWeek: data.rows
              })
          })
          .catch((err) => {
            throw err;
          })

      }
    ], function (err) {
        return  res
        .status(400)
        .json({ message: RESPONSES.DB_CONNECTION_ERROR.message, err });
    });


  }

}
export default StatisticsController
