export default (sequelize, DataTypes) => {
  const Professional = sequelize.define('Professional', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {timestamps: false});
  Professional.associate = (models) => {
    // 1:1
    Professional.belongsTo(models.User, {
      foreignKey: 'UserId',
    });

    // 1:M Profesional
    Professional.hasMany(models.TimeSlot, {
      foreignKey: 'ProfessionalId',
      as: 'timeslot'
    })

    // M:M
    Professional.belongsToMany(models.Category, {
      through: { model: models.ProfessionalCategory },
      as: 'categories',
      foreignKey: 'UserId',
    })
  };
  return Professional;
};
