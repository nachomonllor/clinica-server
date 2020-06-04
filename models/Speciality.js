export default (sequelize, DataTypes) => {
  const Speciality = sequelize.define('Speciality', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
  Speciality.associate = (models) => {
    // 1:1
    Speciality.hasOne(models.Turn, {
      foreignKey: 'SpecialityId'
    });
  };

  return Speciality;
};
