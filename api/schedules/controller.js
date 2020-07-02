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
          model: db.Patient,
          attributes: ['id'],
          include: [
            {
              model: db.User,
              attributes: ['id', 'firstname', 'lastname']
            }
          ]
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
          ],
          where: {
            id: professionalModel.id
          }
        },
      ]
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
  static Update(req, res) {
    const { name, description, active, permissions } = req.body
    const id = +req.params.id
    if (permissions.length > 0) {
      db.Role.findOne({
        where: {
          id,
        },

      }).then((role) => {
        role.setPermissions([5, 6])
        res.status(200).json(role)
      })
    } else {
      db.Role.update(
        {
          id,
          name,
          description,
          active,
        },
        { where: { id } },
      )
        .then((role) => {
          Promise.all([
            deletePermissionsRole(id),
            createPermissionsRole(permissions, id),
          ]).then((responses) => {
            res.status(200).json(role)
          })
        })
        .catch(Sequelize.ValidationError, (msg) =>
          res.status(422).json({ message: msg.errors[0].message }),
        )
        .catch((err) =>
          res
            .status(400)
            .json({ message: RESPONSES.DB_CONNECTION_ERROR.message }),
        )
    }
  }
}

export default SchedulesController
