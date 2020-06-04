import * as bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {

  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  UserRole.associate = (models) => {
    // 1:M
    // User.belongsTo(models.Team, {
    //   foreignKey: 'teamId',
    // });
    // User.belongsToMany(Role, { through: 'RoleUser' }),
  };
  // Method 3 via the direct method
  UserRole.beforeCreate((userRole, options) => {

  });
  return UserRole;
};