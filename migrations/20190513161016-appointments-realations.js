/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return (
      queryInterface.addConstraint(
        // Paciente
        'Appointments',
        ['PatientId'],
        {
          type: 'foreign key',
          name: 'fk_Appointments_PatientId',
          references: {
            table: 'Patients', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      ),
      queryInterface.addConstraint('Appointments', ['ProfessionalId'], {
        type: 'foreign key',
        name: 'fk_Appointments_ProfessionalId',
        references: {
          table: 'Professionals', // name of Target model
          field: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
        allowNull: false,
      }),
      queryInterface.addConstraint('Appointments', ['CategoryId'], {
        type: 'foreign key',
        name: 'fk_Appointments_CategoryId',
        references: {
          table: 'Categories', // name of Target model
          field: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
        allowNull: false,
      })
    )
  },
  down(queryInterface) {
    return (
      queryInterface.removeConstraint('Appointments', 'fk_Appointments_PatientId'),
      queryInterface.removeConstraint('Appointments', 'fk_Appointments_ProfessionalId'),
      queryInterface.removeConstraint('Appointments', 'fk_Appointments_CategoryId')
    )
  },
}
