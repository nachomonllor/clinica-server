// Sequelize es un ORM (Object Relational Mapper)
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TimeSlots', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProfessionalId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    day: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    timeStart: {
      type: Sequelize.STRING(9),
      allowNull: false,
    },
    timeEnd: {
      type: Sequelize.STRING(9),
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Schedules'),
};
