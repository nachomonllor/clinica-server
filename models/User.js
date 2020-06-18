import * as bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const validRoles = ['ADMIN_ROLE', 'PROFESIONAL_ROLE', 'PATIENT_ROLE']
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      lowercase: true,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'El email no esta disponible, elija otro!'
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  User.associate = (models) => {
    // M:M
    User.belongsToMany(models.Role, {
      through: { model: models.UserRole },
      as: 'roles',
      foreignKey: 'UserId',
    });
    // M:M
    User.belongsToMany(models.Category, {
      through: { model: models.UserCategory },
      as: 'categories',
      foreignKey: 'UserId',
    });

    // 1:1
    User.hasOne(models.Appointment, {
      foreignKey: 'UserId'
    });
    User.hasOne(models.Appointment, {
      foreignKey: 'ProfesionalId'
    });

    // 1:1 Profesional
    User.hasMany(models.Schedule, {
      foreignKey: 'ProfesionalId'
    });
  };
  // Method 3 via the direct method
  User.beforeCreate((user, options) => {
    if (!user.changed('password')) {
      return sequelize.Promise.reject("not modified");
    }

    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }

  });
  return User;
};
