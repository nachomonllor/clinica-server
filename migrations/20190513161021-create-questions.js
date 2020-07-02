// Sequelize es un ORM (Object Relational Mapper)
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      PollId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Polls', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Questions'),
}
