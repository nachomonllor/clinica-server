module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
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
    google: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    // roles: {
    //   type: Sequelize.ARRAY(Sequelize.STRING),
    //   defaultValue: null
    // },
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
