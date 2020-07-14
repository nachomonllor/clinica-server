// Sequelize es un ORM (Object Relational Mapper)
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Appointments', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProfessionalId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    PatientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    CategoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    appointmentDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    reviewPatient: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    reviewProfessional: {
      type: Sequelize.TEXT,
      allowNull: true,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Appointments'),
};
