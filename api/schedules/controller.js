import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
import _ from 'lodash'
const { Op } = Sequelize;

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
          where: professionalModel ? {
            id: professionalModel.id,
          } : null,
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
  static async Search(req, res) {
    const filterData = JSON.parse(req.query.filter)

    const professionalModel = await db.Professional.findOne({
      where: {
        UserId: req.user.id
      }
    })
    const where = filterData ? {
      [Op.and]: {
        status: {
          [Op.eq]: `${filterData.status}`,
        },
        CategoryId: {
          [Op.eq]: `${filterData.CategoryId}`,
        },
      },
    } : ''
    db.Appointment.findAll({
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
          where: professionalModel ? {
            id: professionalModel.id,
          } : null,
        },
      ],
      where

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
  static async FetchOne(req, res) {
    const id = +req.params.id
    const professionalModel = await db.Professional.findOne({
      where: {
        UserId: req.user.id
      }
    })
    db.Appointment.findOne({
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
    const customFields = JSON.stringify(req.body.customfields);
    status = +status
    const id = +req.params.id
    db.Appointment.update(
      { appointmentDate, status, reviewProfessional, customFields },
      {
        where: {
          id,
        },
      },
    )
      .then((result) => {
        if (result[0] === 0) {
          sendEmail()
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
function sendEmail() {
  const data = {
    to: user.email,
    from: '"ClinicaMonllor" <clinicamonllor@devkingos.com>', // sender address
    template: 'review-professional',
    subject: 'Mensaje de Profesional ',
    context: {
      firstname: user.firstname,
      url: `https://clinica-monllor.herokuapp.com/verify/${user.id}`
    }
  };
  smtpTransport.sendMail(data, function (err) {
    if (!err) {
      console.log("Email enviado!");
      return res.json({ token: true, password: true, reset: true, email: true });
    } else {
      console.log(err);
      console.log("Hubo un error al enviar el email");
      return res.json({ token: true, password: true, reset: true, email: false });
    }
  });
}
export default SchedulesController
