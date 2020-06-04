const express = require('express');
const bcrypt = require('bcryptjs');
const mdAuthentication = require('../middlewares/authentication');
// const jwt = require('jsonwebtoken');
// const SEED = require('../config/config').SEED;
const User = require('../models/user');

const app = express();

app.get('/', (req, res, next) => {
  let from = req.query.from || 0;
  from = Number(from);

  User.find({}, 'name lastname email img roles google active')
    .skip(from)
    .limit(5)
    .exec((err, users) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error cargando usuarios',
          errors: err,
        });
      }
      User.count({}, (err, count) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message: 'Error al contar usuarios',
            errors: err,
          });
        }
        res.status(200).json({
          ok: true,
          users,
          total: count,
        });
      });
    });
});

// //Verificar token
// app.use('/', (req, res, next) => {
//     let token = req.query.token;

//     jwt.verify(token, SEED, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({
//                 ok: false,
//                 message: 'Token incorrecto',
//                 errors: err
//             });
//         }
//         next();
//     })
// });

app.put('/:id', [mdAuthentication.verifyToken, mdAuthentication.verifyAdminOrSelfUser], (req, res) => {
  const { id } = req.params;
  const { body } = req;

  User.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al buscar usuario',
        errors: err,
      });
    }
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: `El usuario con el id ${id} no existe`,
        errors: { message: 'No existe el usuario con ese ID' },
      });
    }

    user.name = body.name;
    user.lastname = body.lastname;
    user.active = body.active;
    if (!user.google) {
      user.email = body.email;
      if (body.password) {
        user.password = bcrypt.hashSync(body.password, 10);
      }
    }
    user.roles = body.roles;

    user.save((err, userUpdated) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: 'Error al actualizar usuario',
          errors: err,
        });
      }
      // userUpdated.password = ':P';
      res.status(200).json({
        ok: true,
        user: userUpdated.toJSON(),
      });
    });
  });
});
app.post('/', (req, res, next) => {
  const { body } = req;
  const user = new User({
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
    roles: body.roles || ['USER_ROLE'],
  });
  user.save((err, userSaved) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear usuario',
        errors: err,
      });
    }
    res.status(201).json({
      ok: true,
      user: userSaved,
      userToken: req.user,
    });
  });
});

app.delete('/:id', mdAuthentication.verifyToken, (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, userDeleted) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al borrar usuario',
        errors: err,
      });
    }
    if (!userDeleted) {
      return res.status(400).json({
        ok: false,
        message: `El usuario con el id ${id} no existe`,
        errors: { message: `El usuario con el id ${id} no existe` },
      });
    }
    res.status(200).json({
      ok: true,
      user: userDeleted,
    });
  });
});
module.exports = app;
