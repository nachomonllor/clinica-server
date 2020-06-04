export default (sequelize, DataTypes) => {
  const Turn = sequelize.define('Turn', {
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
    SpecialityId: {
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
  Turn.associate = (models) => {
    Turn.belongsTo(models.Speciality, {
      foreignKey: 'SpecialityId',
      targetKey: 'id',
    });
    Turn.belongsTo(models.User, {
      foreignKey: 'UserId',
      targetKey: 'id',
    });
    Turn.belongsTo(models.User, {
      foreignKey: 'ProfesionalId',
      targetKey: 'id',
    });
  };

  return Turn;
};
