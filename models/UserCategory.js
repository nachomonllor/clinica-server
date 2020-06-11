import * as bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {

  const UserCategory = sequelize.define('UserCategory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CategoryId: {
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
  UserCategory.associate = (models) => {
    // 1:M
    // User.belongsTo(models.Team, {
    //   foreignKey: 'teamId',
    // });
    // User.belongsToMany(Role, { through: 'RoleUser' }),

    // UserCategory.belongsTo(models.User, {
    //   foreignKey: 'UserId',
    //   targetKey: 'id',
    // });
    // UserCategory.belongsTo(models.Category, {
    //   foreignKey: 'CategoryId',
    //   targetKey: 'id',
    // });
  };
  // Method 3 via the direct method
  UserCategory.beforeCreate((UserCategory, options) => {

  });
  return UserCategory;
};
