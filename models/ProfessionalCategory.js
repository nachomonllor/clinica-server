import * as bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {

  const ProfessionalCategory = sequelize.define('ProfessionalCategory', {
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
  }, {timestamps: false});
  ProfessionalCategory.associate = (models) => {
    // 1:M
    // User.belongsTo(models.Team, {
    //   foreignKey: 'teamId',
    // });
    // User.belongsToMany(Role, { through: 'RoleUser' }),

    // ProfessionalCategory.belongsTo(models.User, {
    //   foreignKey: 'UserId',
    //   targetKey: 'id',
    // });
    // ProfessionalCategory.belongsTo(models.Category, {
    //   foreignKey: 'CategoryId',
    //   targetKey: 'id',
    // });
  };
  // Method 3 via the direct method
  ProfessionalCategory.beforeCreate((ProfessionalCategory, options) => {

  });
  return ProfessionalCategory;
};
