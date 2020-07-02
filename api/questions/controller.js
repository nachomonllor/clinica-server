import db from '../../models';
import { Sequelize } from '../../models';
import Parametrizer from '../../utils/parametrizer';
import RESPONSES from '../../utils/responses';
import _ from 'lodash';

class QuestionsController {
  static Fetch(req, res) {
    const { Op } = Sequelize;
    const attrs = ['id', 'title', 'active'];

    db.Question.findAndCountAll()
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch(Sequelize.ValidationError, msg => res.status(422).json({ message: msg.errors[0].message }))
      .catch(err => {
        res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message, err })
      });
  }
  static FetchOne(req, res) {
    const id = +req.params.id;
    db.Question.findOne({
        where: {
          id
        }
      })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          });
        } else {
          res.status(200).json({
            ok: true,
            payload: result,
          });
        }
      }).catch(Sequelize.ValidationError, msg => res.status(422).json({
        message: msg.errors[0].message,
      })).catch(err => res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message }));
  }
  static Create(req, res) {
    const { title, active } = req.body;
    db.Question.create(req.body)
      .then((question) => {
        res.status(200).json({
          ok: true,
          question,
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
    const { name, title, active } = req.body;
    const id = +req.params.id;
    if (permissions.length > 0) {
      db.Question.findOne({
          where: {
            id
          }
        })
        .then((question) => {
          res.status(200).json(question);
        });
    } else {
      db.Question.update({
          id,
          title,
          active,
        }, { where: { id } })
        .then((question) => {
          res.status(200).json(question);
        })
        .catch(Sequelize.ValidationError, msg => res.status(422).json({ message: msg.errors[0].message }))
        .catch((err) => res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message }));
    }

  }
  static Delete(req, res) {
    const { id } = req.params;
    db.Question.destroy({ where: { id } })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          });
        } else {
          res.status(200).json({
            message: RESPONSES.DELETE_RECORD_ERROR.message,
          });
        }
      })
      .catch(Sequelize.ValidationError, msg => res.status(422).json({ message: msg.errors[0].message }))
      .catch(Sequelize.ForeignKeyConstraintError, err => res.status(400).json({
        message: RESPONSES.RECORD_IN_USE_ERROR
          .message
      }))
      .catch((err) => res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }));
  }
}


export default QuestionsController;
