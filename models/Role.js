export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      lowercase: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  Role.associate = (models) => {
    // M:M
    Role.belongsToMany(models.User, {
      through: { model: models.UserRole },
      as: 'users',
      foreignKey: 'RoleId',
    });
  };

  return Role;
};
