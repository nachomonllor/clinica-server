import * as bcrypt from 'bcryptjs'

export default (sequelize, DataTypes) => {
  const AuditProfessional = sequelize.define('AuditProfessional', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProfessionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  })
  AuditProfessional.associate = (models) => {

  }

  return AuditProfessional
}
