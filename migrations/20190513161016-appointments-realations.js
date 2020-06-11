/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return (
      queryInterface.addConstraint(
        // Paciente
        'Appointments',
        ['UserId'],
        {
          type: 'foreign key',
          name: 'fk_Appointments_UserId',
          references: {
            table: 'Users', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      ),
      queryInterface.addConstraint('Appointments', ['ProfesionalId'], {
        type: 'foreign key',
        name: 'fk_Appointments_ProfesionalId',
        references: {
          table: 'Users', // name of Target model
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
      queryInterface.removeConstraint('Appointments', 'fk_Appointments_UserId'),
      queryInterface.removeConstraint('Appointments', 'fk_Appointments_ProfesionalId'),
      queryInterface.removeConstraint('Appointments', 'fk_Appointments_CategoryId')
    )
  },
}
