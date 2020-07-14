import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
import _ from 'lodash'

class ReviewController {
  static FetchOne(req, res) {
    const attributes = ['id', 'reviewPatient', 'reviewProfessional']
    const id = +req.params.id
    db.Appointment.findOne({
      attributes,
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
    let { reviewPatient } = req.body
    const id = +req.params.id
    db.Appointment.update(
      { reviewPatient },
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

export default ReviewController
