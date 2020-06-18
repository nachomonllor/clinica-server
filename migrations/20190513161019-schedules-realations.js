/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return (
      queryInterface.addConstraint(
        'Schedules',
        ['ProfesionalId'],
        {
          type: 'foreign key',
          name: 'fk_Schedules_ProfesionalId',
          references: {
            table: 'Users', // name of Target model
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
      queryInterface.removeConstraint('Schedules', 'fk_Schedules_ProfesionalId')
    )
  },
}
