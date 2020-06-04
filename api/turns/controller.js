import db from '../../models';
import { Sequelize } from '../../models';
import Parametrizer from '../../utils/parametrizer';
import RESPONSES from '../../utils/responses';
import _ from 'lodash';

class TurnsController {
  static Fetch(req, res) {
    const id = req.user.id;
    db.Turn.findAndCountAll({
        where: {
          UserId: id
        },
      })
      .then((turns) => {
        res.status(200).json(Parametrizer.responseOk(data, options));
      }).catch(Sequelize.ValidationError, msg => res.status(422).json({
        message: msg.errors[0].message,
      })).catch(err => res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message }));
  }
  static Create(req, res) {
    const { SpecialityId, ProfesionalId, turnDate  } = req.body;
    db.Turn.create(req.body)
      .then((turn) => {
        res.status(200).json({
          ok: true,
          turn,
        });
      })
      .catch(Sequelize.ValidationError, msg => {
        res.status(422).json({ message: msg.original.message });
      })
      .catch((err) => {
        res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message });
      });
  }
  static Update(req, res) {
    const { rolename, description, active, permissions } = req.body;
    const id = +req.params.id;
    if (permissions.length > 0) {
      db.Role.findOne({
          where: {
            id
          },
          include: [{
            model: db.Permission,
            as: 'Permissions',

          }]
        })
        .then((role) => {
          role.setPermissions([5, 6]);
          res.status(200).json(role);
        });
    } else {
      db.Role.update({
          id,
          rolename,
          description,
          active,
        }, { where: { id } })
        .then((role) => {

          Promise.all([
              deletePermissionsRole(id),
              createPermissionsRole(permissions, id),
            ])
            .then((responses) => {
              res.status(200).json(role);
            })
        })
        .catch(Sequelize.ValidationError, msg => res.status(422).json({ message: msg.errors[0].message }))
        .catch((err) => res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message }));
    }

  }

}


export default TurnsController;
