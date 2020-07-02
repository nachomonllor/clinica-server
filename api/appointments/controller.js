import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
import _ from 'lodash'

class AppointmentsController {
  static async Fetch(req, res) {
    const id = req.user.id
    const attrs = [
      'id',
      'CategoryId',
      'ProfessionalId',
      'appointmentDate',
      'createdAt',
      'status',
    ]
    const patientModel = await db.Patient.findOne({
      where: {
        UserId: req.user.id
      }
    });
    db.Appointment.findAndCountAll({
      attributes: attrs,
      include: [
        {
          model: db.Category,
        },
        {
          model: db.Professional,
          as: 'professional',
          attributes: ['id'],
          include: [
            {
              model: db.User,
              attributes: ['id', 'firstname', 'lastname']
            }
          ]
        },
      ],
      where: {
        PatientId: patientModel.id,
      },
    })
      .then((appointments) => {
        res.status(200).json(appointments.rows)
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
  static async Create(req, res) {
    const body = req.body
    body.status = 1;
    const patientModel = await db.Patient.findOne({
      where: {
        UserId: req.user.id
      }
    });
    const professionalModel = await db.Professional.findOne({
      where: {
        UserId: body.ProfessionalId
      }
    });
    body.PatientId = patientModel.id;
    body.ProfessionalId = professionalModel.id;
    db.Appointment.create(body)
      .then((appointment) => {
        res.status(200).json({
          ok: true,
          appointment,
        })
      })
      .catch(Sequelize.ValidationError, (msg) => {
        res.status(422).json({ message: msg.original.message })
      })
      .catch((err) => {
        res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message })
      })
  }
  static Update(req, res) {
    const { name, description, active } = req.body
    const id = +req.params.id
  }
  static Delete(req, res) {
    const { id } = req.params
    db.Appointment.destroy({ where: { id } })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            message: RESPONSES.DELETE_RECORD_ERROR.message,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch(Sequelize.ForeignKeyConstraintError, (err) =>
        res.status(400).json({
          message: RESPONSES.RECORD_IN_USE_ERROR.message,
        }),
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
}

export default AppointmentsController
