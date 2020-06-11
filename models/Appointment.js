export default (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProfesionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    turnDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    Appointment.belongsTo(models.User, {
      foreignKey: 'UserId',
      targetKey: 'id',
    });
    Appointment.belongsTo(models.User, {
      foreignKey: 'ProfesionalId',
      targetKey: 'id',
    });
  };

  return Appointment;
};
