const db = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./user');

const Event = db.define('event', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasMany(Event, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
Event.belongsTo(User);
Event.sync({ alter: true });

module.exports = Event;
