import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as _ from 'lodash'
import RESPONSES from '../../utils/responses'
const validRoles = require('../../utils/validRoles')
const node_env = process.env.NODE_ENV || 'development'
const { SEED } = require('../../config/config')[node_env]

class AuthController {
  static Login(req, res) {
    const { Op } = Sequelize
    const { body } = req
    db.User.findOne({
      where: {
        email: body.email,
      },
    })
      .then(async (user) => {
        if (!user.is_verified) {
          return res.status(403).json({
            ok: false,
            message: 'Forbidden',
            errors: 'Forbidden',
          })
        }
        if (!user) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          })
        }
        if (!bcrypt.compareSync(body.password, user.password)) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          })
        }
        // Crear un token
        // expira en 4hs

        user.password = ':P'
        const token = jwt.sign({ user: user }, SEED, { expiresIn: 14400 })
        const professionalModel = await db.Professional.findOne({
          where: {
            UserId: user.id,
          },
        })
        if (professionalModel) {
          await db.AuditProfessional.create({
            ProfessionalId: professionalModel.id,
          })
        }

        const { role } = user
        res.status(200).json({
          ok: true,
          user: user,
          token,
          // id: user.id,
          menu: getMenu(role),
        })
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: 'issues trying to connect to database' + err, err })
      })
  }
  static Verify(req, res) {
    const id = +req.params.id
    db.User.update(
      { is_verified: true, active: true },
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
        return res.status(201).json({
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
  static RenewToken(req, res) {
    const token = jwt.sign({ user: req.user }, SEED, { expiresIn: 14400 })
    res.status(200).json({
      ok: true,
      token,
    })
  }
}

function getMenu(role) {
  const menu = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Perfil', url: '/profile' },
      ],
    },
    {
      titulo: 'Administración',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [],
    },
  ]
  if (containsAdminRole(role)) {
    menu[1].submenu.push({ titulo: 'Usuarios', url: '/users' })
    menu[1].submenu.push({ titulo: 'Especialidades', url: '/categories' })
    menu.push({
      titulo: 'Reportes',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [{ titulo: 'Turnos', url: '/reports/schedules' }],
    })
  }
  if (containsProfessionalRole(role)) {
    menu[1].submenu.push({ titulo: 'Turnos', url: '/schedules' })
  }
  if (containsPatientRole(role)) {
    menu[1].submenu.push({ titulo: 'Turnos', url: '/appointments' })
  }
  return menu
}

function containsAdminRole(role) {
  return role === validRoles.Admin
}
function containsProfessionalRole(role) {
  return role === validRoles.Professional
}
function containsPatientRole(role) {
  return role === validRoles.Patient
}
export default AuthController
