module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('TimeSlots', [{
    ProfessionalId: 1,
    day: 1,
    timeStart: "13:00",
    timeEnd: "19:00",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    ProfessionalId: 1,
    day: 3,
    timeStart: "13:00",
    timeEnd: "19:00",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    ProfessionalId: 1,
    day: 5,
    timeStart: "16:00",
    timeEnd: "21:00",
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('TimeSlots', null, {}),
}
