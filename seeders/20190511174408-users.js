const bcrypt = require('bcryptjs');
/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstname: 'Ignacio',
    lastname: 'Monllor',
    email: 'nachomonllorc@gmail.com',
    is_verified: true,
    password: bcrypt.hashSync('123456', 10),
    role: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    firstname: 'Tony',
    lastname: 'Stark',
    email: 'tony@gmail.com',
    is_verified: false,
    password: bcrypt.hashSync('123456', 10),
    role: 2,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    firstname: 'Bruce',
    lastname: 'Banner',
    email: 'bruce@gmail.com',
    is_verified: false,
    password: bcrypt.hashSync('123456', 10),
    role: 3,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
}
