/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Cardiología',
          active: true
        },
        {
          name: 'Endocrinología',
          active: true
        },
        {
          name: 'Nutricionista',
          active: true
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Categories', null, {}),
}
