import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
import _ from 'lodash'

class SchedulesController {
  static async Fetch(req, res) {
    const id = req.user.id
    const attrs = [
      'id',
      'PatientId',
      'CategoryId',
      'ProfessionalId',
      'appointmentDate',
      'createdAt',
      'status',
    ]
    const professionalModel = await db.Professional.findOne({
      where: {
        UserId: req.user.id,
      },
    })
    db.Appointment.findAndCountAll({
      attributes: attrs,
      include: [
        {
          model: db.Category,
        },
        {
          model: db.Patient,
          attributes: ['id'],
          include: [
            {
              model: db.User,
              attributes: ['id', 'firstname', 'lastname'],
            },
          ],
        },
        {
          model: db.Professional,
          as: 'professional',
          attributes: ['id'],
          include: [
            {
              model: db.User,
              attributes: ['id', 'firstname', 'lastname'],
            },
          ],
          where: {
            id: professionalModel.id,
          },
        },
      ],
    })
      .then((schedules) => {
        res.status(200).json(schedules.rows)
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({
          message: msg.errors[0].message,
        }),
      )
      .catch((err) => {
        res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message })
      })
  }
  static FetchOne(req, res) {
    const id = +req.params.id
    db.Appointment.findOne({
      where: {
        id,
      },
    })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            ok: true,
            payload: result,
          })
        }
      })
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message }),
      )
  }
  static Update(req, res) {
    let { appointmentDate, status, reviewProfessional } = req.body
    status = +status
    const id = +req.params.id
    db.Appointment.update(
      { appointmentDate, status, reviewProfessional },
      {
        where: {
          id,
        },
      },
    )
      .then((result) => {
        if (result[0] === 0) {
          return res.status(404).json({
            ok: false,
            err: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        }
        res.status(201).json({
          ok: true,
          description: RESPONSES.RECORD_UPDATED_SUCCESS.message,
        })
      })
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message }),
      )
  }
}

export default SchedulesController
