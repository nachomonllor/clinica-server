const bcrypt = require('bcryptjs');
/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstname: 'Ignacio',
    lastname: 'Monllor',
    email: 'nachomonllorc@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    role: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
}
