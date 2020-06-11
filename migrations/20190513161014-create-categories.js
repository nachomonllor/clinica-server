module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Categories', {
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
      allowNull: false
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Categories'),
};
