export default (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProfessionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    reviewPatient: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reviewProfessional: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    surveyProfessional: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    surveyPatient: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    customFields: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  // relaciones entre objetos
  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Category, {
      foreignKey: 'CategoryId',
      targetKey: 'id',
    });
    Appointment.belongsTo(models.Patient, {
      foreignKey: 'PatientId',
      targetKey: 'id',
    });
    Appointment.belongsTo(models.Professional, {
      foreignKey: 'ProfessionalId',
      as: 'professional',
      targetKey: 'id',
    });
    // 1:M
    Appointment.hasMany(models.Review, {
      foreignKey: 'AppointmentId',
    })
  };

  return Appointment;
};
