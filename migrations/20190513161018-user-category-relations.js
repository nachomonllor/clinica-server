/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
        'UserCategories', ['UserId'], {
          type: 'foreign key',
          name: 'fk_UserCategories_UserId',
          references: {
            table: 'Users', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      ), queryInterface.addConstraint(
        'UserCategories', ['CategoryId'], {
          type: 'foreign key',
          name: 'fk_UserCategories_CategoryId',
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
    return queryInterface.removeConstraint('UserCategories', 'fk_UserCategories_UserId'),
      queryInterface.removeConstraint('UserCategories', 'fk_UserCategories_CategoryId');
  },
};
