/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Specialities',
      [
        {
          name: 'Cardiología',
        },
        {
          name: 'Endocrinología',
        },
        {
          name: 'Nutricionista',
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Specialities', null, {}),
}
