import mongoose from 'mongoose'

export default function(node_env) {
  const config = require('./config')[node_env]
  // let port = 27017
  // let mongodb
  // if (node_env === 'development') {
  //   mongodb = 'localhost'
  // }
  // if (node_env === 'production') {
  //   mongodb = 'mongodb-uat'
  // }
  // if (node_env === 'test') {
  //   port = 27018
  //   mongodb = 'mongodb-qa'
  // }
  const options = {
    useNewUrlParser: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
  // ES6 promises
  mongoose.Promise = Promise
  mongoose.connect(`mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`, options, () => {
    const initDb = require('../scripts/seed-superadmin')
    initDb()
    console.log('Base de datos Mongo: \x1b[32m%s\x1b[0m', 'online')
  })
  .catch(err => {
    if (err) throw err
  })

}