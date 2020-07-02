export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
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
  Category.associate = (models) => {
    // 1:1
    Category.hasOne(models.Appointment, {
      foreignKey: 'CategoryId'
    });
    // M:M
    Category.belongsToMany(models.Professional, {
      through: { model: models.ProfessionalCategory },
      as: 'professionals',
      foreignKey: 'CategoryId',
    });
  };

  return Category;
};
