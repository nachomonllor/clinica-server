module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Specialities', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Specialities'),
};
