const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('./User')

const Request = sequelize.define('Request', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'completada'),
    defaultValue: 'pendiente'
  }
})

Request.belongsTo(User) // Una petición pertenece a un usuario

module.exports = Request
