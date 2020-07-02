/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Polls',
      [
        {
          title: 'Encuesta de Satisfacción',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Polls', null, {}),
}
