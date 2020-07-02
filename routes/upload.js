const express = require('express')
const expressFileUpload = require('express-fileupload')
const fs = require('fs')
const cors = require('cors')
const path = require('path')

const db = require('../models')
const User = require('../models/User')
const { Sequelize } = require('../models')
const mdAuthentication = require('../middlewares/authentication')
// con UploadUtils = require('./upload/utils')
const RESPONSES = require('../utils/responses')

const app = express()
app.use(expressFileUpload())

app.put('/:tipo/:id', (req, res, next) => {
  const { tipo } = req.params
  const { id } = req.params
  const validTypes = ['medicos', 'users']
  if (validTypes.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      message: 'tipo de colección no es válida',
      errors: {
        message: 'tipo de colección no es válida',
      },
    })
  }
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      message: 'No selecciono nada',
      errors: {
        message: 'debe seleccionar una imagen',
      },
    })
  }
  const file = req.files.image || req.files.file
  const extFile = path.extname(file.name)
  const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', 'xls', 'xlsx']
  if (validExtensions.indexOf(extFile) < 0) {
    return res.status(400).json({
      ok: false,
      message: 'Extensión no válida',
      errors: {
        message: `Las extensiones válidas son ${validExtensions.join(', ')}`,
      },
    })
  }

  // Nombre de archivo personalizado
  const fileName = `${id}-${new Date().getMilliseconds()}${extFile}`
  // Mover el archivo del temporal a un path
  const newPath = path.join(__dirname, '../', `uploads/${tipo}/${fileName}`)
  if (!fs.existsSync(path.join(__dirname, '../', `uploads/${tipo}`))) {
    fs.mkdirSync(path.join(__dirname, '../', `uploads/${tipo}`))
  }

  file.mv(newPath, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al mover archivo',
        errors: err,
      })
    }
    subirPorTipo(tipo, id, fileName, res)
  })
})

function subirPorTipo(tipo, id, fileName, res) {
  if (tipo === 'users') {
    db.User.findOne({
      where: {
        id,
      },
    }).then((user) => {
      if (!user) {
        return res.status(400).json({
          ok: false,
          message: 'Usuario no existe',
          errors: { message: 'Usuario no existe' },
        })
      }
      const pathOld = path.join(__dirname, '../', `./uploads/users/${user.img}`)
      // si existe, elmina la imagen anterior
      if (fs.existsSync(pathOld)) {
        fs.unlink(pathOld, (err) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              message: 'Error al eliminar del fs la imagen',
              errors: err,
            })
          }
        })
      }
      user.img = fileName
      user
        .save()
        .then((userUpdated) => {
          userUpdated.password = ':P'
          res.status(200).json({
            ok: true,
            message: 'Imagen de usuario actualizada',
            user: userUpdated,
          })
        })
        .catch((err) => {
          return res.status(500).json({
            ok: false,
            message: 'Error al actualizar imagen de usuario',
            errors: err,
          })
        })
    })
  }
}

module.exports = app
