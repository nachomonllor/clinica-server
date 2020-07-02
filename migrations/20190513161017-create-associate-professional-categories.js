/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProfessionalCategories', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    CategoryId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ProfessionalCategories'),
};
