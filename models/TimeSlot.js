export default (sequelize, DataTypes) => {
  const TimeSlot = sequelize.define('TimeSlot', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProfessionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeStart: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeEnd: {
      type: DataTypes.STRING,
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
  TimeSlot.associate = (models) => {
    TimeSlot.belongsTo(models.Professional, {
      foreignKey: 'ProfessionalId',
      targetKey: 'id',
    });

  };

  return TimeSlot;
};
