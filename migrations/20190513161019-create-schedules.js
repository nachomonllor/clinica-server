// Sequelize es un ORM (Object Relational Mapper)
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Schedules', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProfesionalId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    day: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    timeStart: {
      type: Sequelize.STRING(5),
      allowNull: false,
    },
    timeEnd: {
      type: Sequelize.STRING(5),
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
