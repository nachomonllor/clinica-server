export default (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
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
  Patient.associate = (models) => {
    // 1:1
    Patient.belongsTo(models.User, {
      foreignKey: 'UserId',
    });
    Patient.hasMany(models.Appointment, {
      foreignKey: 'PatientId',
    })
  };
  return Patient;
};
