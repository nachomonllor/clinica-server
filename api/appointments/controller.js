import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
import _ from 'lodash'

class AppointmentsController {
  static Fetch(req, res) {
    const id = req.user.id
    const attrs = ['id', 'appointmentDate', 'createdAt', 'active'];
    const search = ['appointmentDate', 'active'];
    const options = Parametrizer.getOptions(req.query, attrs, search)
    db.Appointment.findAndCountAll({
      where: {
        UserId: id,
      },
    })
      .then((appointments) => {
        res.status(200).json(Parametrizer.responseOk(appointments, options))
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
  static Create(req, res) {
    const { CategoryId, ProfesionalId, appointmentDate } = req.body
    db.Appointment.create(req.body)
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
    const { name, description, active, permissions } = req.body
    const id = +req.params.id
    if (permissions.length > 0) {
      db.Role.findOne({
        where: {
          id,
        },
        include: [
          {
            model: db.Permission,
            as: 'Permissions',
          },
        ],
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

export default AppointmentsController
