/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return (
      queryInterface.addConstraint(
        // Paciente
        'Turns',
        ['UserId'],
        {
          type: 'foreign key',
          name: 'fk_Turns_UserId',
          references: {
            table: 'Users', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      ),
      queryInterface.addConstraint('Turns', ['ProfesionalId'], {
        type: 'foreign key',
        name: 'fk_Turns_ProfesionalId',
        references: {
          table: 'Users', // name of Target model
          field: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
        allowNull: false,
      }),
      queryInterface.addConstraint('Turns', ['SpecialityId'], {
        type: 'foreign key',
        name: 'fk_Turns_SpecialityId',
        references: {
          table: 'Specialities', // name of Target model
          field: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
        allowNull: false,
      })
    )
  },
  down(queryInterface) {
    return (
      queryInterface.removeConstraint('Turns', 'fk_Turns_UserId'),
      queryInterface.removeConstraint('Turns', 'fk_Turns_ProfesionalId'),
      queryInterface.removeConstraint('Turns', 'fk_Turns_SpecialityId')
    )
  },
}
