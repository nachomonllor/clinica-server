/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Questions',
      [
        {
          PollId: 1,
          title: '¿Actualmente, sufres de alguna enfermedad crónica?',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PollId: 1,
          title: '¿Tienes alguna enfermedad o condición hereditaria?',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Questions', null, {}),
}
