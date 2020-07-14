module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Professionals', [{
    UserId: 2
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Professionals', null, {}),
}
