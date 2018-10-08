const Sequelize = require('sequelize');
const sequelize = new Sequelize('paxful', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
})

module.exports = sequelize