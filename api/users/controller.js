import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
import smtpTransport from '../../utils/transport'
const { Op } = Sequelize
const validRoles = require('../../utils/validRoles')
class UsersController {
  static Fetch(req, res) {
    const attrs = [
      'id',
      'img',
      'firstname',
      'lastname',
      'email',
      'is_verified',
      'img',
      'role',
      'active',
      'createdAt',
    ]
    const role = +req.query.role
    let where = {}
    if (role === validRoles.Professional) {
      where = {
        role,
      }
    }
    db.User.findAndCountAll({
      attributes: attrs,
      where,
      order: [['id', 'ASC']],
    })
      .then((data) => {
        res.status(200).json(data.rows)
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static FetchOne(req, res) {
    const attrs = [
      'id',
      'firstname',
      'lastname',
      'email',
      'is_verified',
      'img',
      'role',
      'active',
    ]
    const id = +req.params.id || 0
    if (id === 0) {
      return
    }
    const categoryId = +req.query.categoryId || null
    let where = {}
    if (categoryId) {
      where = {
        id: categoryId,
      }
    }
    db.User.findOne({
      attributes: attrs,
      include: [
        {
          model: db.Professional,
          include: [
            {
              model: db.Category,
              as: 'categories',
              through: ['id'],
              where,
            },
            {
              model: db.TimeSlot,
              as: 'timeslot',
            },
          ],
        },
      ],
      where: {
        id,
      },
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            user,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) => {
        res.status(422).json({
          message: msg.errors[0].message,
        })
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static Create(req, res) {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      img,
      categories,
      timeslot
    } = req.body
    const active = req.body.active || false
    const is_verified = false
    const role = +req.body.role
    db.sequelize
      .transaction({ autocommit: false })
      .then(async (t) => {
        const userModel = await db.User.create(
          {
            firstname,
            lastname,
            email,
            password,
            phone,
            img,
            role,
            is_verified,
            active,
          },
          { transaction: t },
        )
        userModel.password = ':P'
        if (role === validRoles.Patient) {
          const patientModel = await db.Patient.create(
            { UserId: userModel.id },
            { transaction: t },
          )
        }
        if (role === validRoles.Professional) {
          const professionalModel = await db.Professional.create(
            { UserId: userModel.id },
            { transaction: t },
          )
          if (categories) {
            const categoriesModel = await db.Category.findAll(
              {
                where: {
                  [Op.or]: {
                    id: categories,
                  },
                },
              },
              { transaction: t },
            )
            await professionalModel.setCategories(categoriesModel, {
              transaction: t,
            })
            if (timeslot) {
              const timeslot = filterTimeSlot(req.body.timeslot)
              await db.TimeSlot.bulkCreate(
                timeslot.map((i) => {
                  i.ProfessionalId = professionalModel.id
                  return i
                }),
                { transaction: t },
              )
            }
          }
        }
        t.commit()
        return userModel
      })
      .then((user) => {
        const data = {
          to: user.email,
          from: '"ClinicaMonllor " <clinicamonllor@devkingos.com>', // sender address
          template: 'verify-email',
          subject: 'Verificar Email',
          context: {
            firstname: user.firstname,
            url: `https://clinica-monllor.herokuapp.com/verify/${user.id}`,
          },
        }
        smtpTransport.sendMail(data, function (err) {
          if (!err) {
            console.log('Email enviado!')
            res.json({
              ok: true,
              user,
            })
          } else {
            console.log(err)
            console.log('Hubo un error al enviar el email')
            res.json({
              ok: true,
              user,
              description: RESPONSES.EMAIL_SEND_FAIL.message
            })
          }
        })
      })
      .catch((err) => {
        res
          .status(400)
          .json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
  static Update(req, res) {
    const {
      firstname,
      lastname,
      email,
      is_verified,
      password,
      phone,
      img,
      categories,
    } = req.body
    const id = +req.params.id
    const active = req.body.active || false
    const role = +req.body.role
    let options = {
      firstname,
      lastname,
      email,
      is_verified,
      phone,
      img,
      role,
      active,
    }
    if (password) {
      options.password = password
    }
    db.sequelize
      .transaction({ autocommit: false })
      .then(async (t) => {
        await db.User.update(
          options,
          { where: { id }, individualHooks: true },
          { transaction: t },
        )
        if (role === validRoles.Professional) {
          let timeslot = filterTimeSlot(req.body.timeslot)
          if (categories) {
            const userModel = await db.User.findOne({
              where: { id },
              include: [{ model: db.Professional }],
            })
            const professionalId = userModel.Professional.id
            const categoriesModel = await db.Category.findAll(
              {
                where: {
                  [Op.or]: {
                    id: categories,
                  },
                },
              },
              { transaction: t },
            )
            await userModel.Professional.setCategories(categoriesModel, {
              transaction: t,
            })
            await db.TimeSlot.destroy(
              {
                where: {
                  ProfessionalId: professionalId,
                },
              },
              { transaction: t },
            )
            timeslot = timeslot.map((i) => {
              i.ProfessionalId = professionalId
              return i
            })
            await db.TimeSlot.bulkCreate(timeslot, { transaction: t })
          }
        }
        t.commit()
        return true
      })
      .then((resp) => {
        res.status(200).end()
      })
      .catch((err) => {
        res.status(400).json({ description: err }).end()
      })
  }
  static Delete(req, res) {
    const { id } = req.params
    db.User.destroy({ where: { id } })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: 'Registro no encontrado!',
          })
        } else {
          res.status(200).json({
            message: 'El usuario ha sido desactivado!',
          })
        }
      })
      // .catch(Sequelize.ValidationError, (msg) =>
      //   res.status(422).json({ message: msg.errors[0].message }),
      // )
      // .catch(Sequelize.ForeignKeyConstraintError, (err) =>
      //   res
      //     .status(400)
      //     .json({
      //       message:
      //         'El registro no puede ser eliminado por que ya está en uso. Solo puede desactivarlo',
      //     }),
      // )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
}
const filterTimeSlot = (timeslot) => {
  return timeslot.filter((i) => {
    return i.timeStart && i.timeEnd
  })
}
export default UsersController
