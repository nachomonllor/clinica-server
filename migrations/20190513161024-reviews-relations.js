/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
        'Reviews', ['PatientId'], {
          type: 'foreign key',
          name: 'fk_Reviews_PatientId',
          references: {
            table: 'Patients', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      );
  },
  down(queryInterface) {
    return queryInterface.removeConstraint('Reviews', 'fk_Reviews_PatientId');
  },
};
