const bcrypt = require('bcryptjs');
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
    name: 'Administrador',
    description: 'Administrador',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Profesional',
    description: 'Profesional',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Paciente',
    description: 'Paciente',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),

  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {}),
};
