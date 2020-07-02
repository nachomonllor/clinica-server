import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as _ from 'lodash'
const validRoles = require('../../utils/validRoles')
const node_env = process.env.NODE_ENV || 'development'
const { SEED } = require('../../config/config')[node_env]

class AuthController {
  static Login(req, res) {
    const { body } = req
    db.User.findOne({
        where: {
          email: body.email
        },
      }).then(user => {
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
        const { role } = user
        res.status(200).json({
          ok: true,
          user: user,
          token,
          // id: user.id,
          menu: getMenu(role),
        })
      })
      .catch(err => {
        res.status(400).json({ message: 'issues trying to connect to database' + err, err })
      })
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
  const menu = [{
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
