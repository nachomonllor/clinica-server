/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
        'AuditProfessionals', ['ProfessionalId'], {
          type: 'foreign key',
          name: 'fk_AuditProfessionals_ProfessionalId',
          references: {
            table: 'Professionals', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      );
  },
  down(queryInterface) {
    return queryInterface.removeConstraint('AuditProfessionals', 'fk_AuditProfessionals_ProfessionalId');
  },
};
