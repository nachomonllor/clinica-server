/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
        'ProfessionalCategories', ['UserId'], {
          type: 'foreign key',
          name: 'fk_ProfessionalCategories_UserId',
          references: {
            table: 'Professionals', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      ), queryInterface.addConstraint(
        'ProfessionalCategories', ['CategoryId'], {
          type: 'foreign key',
          name: 'fk_ProfessionalCategories_CategoryId',
          references: {
            table: 'Categories', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      );
  },
  down(queryInterface) {
    return queryInterface.removeConstraint('ProfessionalCategories', 'fk_ProfessionalCategories_UserId'),
      queryInterface.removeConstraint('ProfessionalCategories', 'fk_ProfessionalCategories_CategoryId');
  },
};
