module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('ProfessionalCategories', [{
    UserId: 1,
    CategoryId: 1
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ProfessionalCategories', null, {}),
}
