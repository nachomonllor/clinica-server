module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Patients', [{
    UserId: 3
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Patients', null, {}),
}
