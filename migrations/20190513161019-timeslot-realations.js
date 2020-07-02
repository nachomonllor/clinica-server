/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return (
      queryInterface.addConstraint(
        // Paciente
        'TimeSlots',
        ['ProfessionalId'],
        {
          type: 'foreign key',
          name: 'fk_TimeSlots_ProfessionalId',
          references: {
            table: 'Professionals', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      )
    )
  },
  down(queryInterface) {
    return (
      queryInterface.removeConstraint('TimeSlots', 'fk_TimeSlots_ProfessionalId')
    )
  },
}
