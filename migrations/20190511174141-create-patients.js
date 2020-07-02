module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Patients', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {timestamps: false}),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Patients'),
};
