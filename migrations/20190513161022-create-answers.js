// Sequelize es un ORM (Object Relational Mapper)
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Answers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      QuestionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      description: {
        type: Sequelize.TEXT,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Answers'),
}
