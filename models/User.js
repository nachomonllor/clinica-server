import * as bcrypt from 'bcryptjs'

export default (sequelize, DataTypes) => {
  //1=ADMIN 2=PROFESSIONAL 3=PATIENT
  const validRoles = [1, 2, 3]
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
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
        isEmail: true,
      },
      unique: {
        args: true,
        msg: 'El email no esta disponible, elija otro!',
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      values: validRoles,
      defaultValue: 2,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  })
  User.associate = (models) => {
    // 1:1
    User.hasOne(models.Professional, {
      foreignKey: 'UserId',
    })
    User.hasOne(models.Patient, {
      foreignKey: 'UserId',
    })
  }
  // Method 3 via the direct method
  User.beforeCreate((user, options) => {
    if (!user.changed('password')) {
      return sequelize.Promise.reject('not modified')
    }
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  })

  User.beforeUpdate((user, options) => {
    if (user.changed('password')) {
      if (user.password) {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    }
  })
  return User
}
