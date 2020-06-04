import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import db from './models/index'
import apiRoutes from './api/api.routes'

const app = express()
// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const node_env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

const config = require('./config/config.json')[node_env]
app.use(cors())

if (node_env === 'development') {
  // información del request en consola
  morgan(':method :url :status :res[content-length] - :response-time ms')
}
const uploadRoutes = require('./routes/upload')
const imagesRoutes = require('./routes/images')

app.use('/upload', uploadRoutes)
app.use('/img', imagesRoutes)
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  res.send('API!')
})
db.sequelize
  .sync()
  .then((data) => {
    // console.log(data.config);
    console.log(
      'Postgres connection has been established successfully: \x1b[32m%s\x1b[0m',
      'online',
    )
  })
  .catch((err) => {
    console.error('Unable to connect to the database Postgres:', err)
  })
const server = app.listen(port, (err) => {
  if (err) {
    console.error(err)
  } else {
    // console.log(`Express server corriendo en el port ${server.address().port}: \x1b[32m%s\x1b[0m`, 'online');
    console.log(
      `Express server corriendo en el port ${port}: \x1b[32m%s\x1b[0m`,
      'online',
    )
  }
})
