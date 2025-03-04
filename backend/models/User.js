const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Role = require('./Role')

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

User.belongsTo(Role) // Un usuario pertenece a un rol
module.exports = User
