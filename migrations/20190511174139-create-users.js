module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      lowercase: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    role: {
      type: Sequelize.INTEGER,
      values: [
        1, // ADMIN_ROLE,
        2, // PROFESSIONAL_ROLE',
        3 // PATIENT_ROLE
      ],
      defaultValue: 3,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }, {timestamps: false}),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
