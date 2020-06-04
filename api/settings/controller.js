import db from '../../models';
import { Sequelize } from '../../models';
import Parametrizer from '../../utils/parametrizer';
import RESPONSES from '../../utils/responses';
import _ from 'lodash';

class SettingsController {
  static Fetch(req, res) {
    db.Setting.findAndCountAll()
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch(err => {
        res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message, err })
      });
  }
  static Update(req, res) {
    const body = req.body;
    const id = +req.params.id;
    db.Setting.findOne({
        where: {
          id
        }
      })
      .then((setting) => {
        db.Setting.update( body, { where: { id } })
        .then((setting) => {
          res.status(200).json(setting);
        })
      })
      .catch((err) => {
        res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message })
      });
  }
}
export default SettingsController;
