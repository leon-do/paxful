const Sequelize = require('sequelize')
const sequelize = require('../index')

const Transactions = sequelize.define('transactions', {
  isComplete: {
    type: Sequelize.BOOLEAN
  },
  tradeHash: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  payPalPayment: {
    type: Sequelize.STRING
  },
  dollars: {
    type: Sequelize.FLOAT
  },
  bitcoin: {
    type: Sequelize.FLOAT
  }
})

// Transactions.sync({force: true}).then(() => {
//   Transactions.create({
//     isComplete: false,
//     tradeHash: Math.floor(Math.random() * 1000).toString(),
//     userName: 'foobar',
//     email: 'email@email.com',
//     payPalPayment: '23faw32fawsdf',
//     dollars: 123,
//     bitcoin: 0.0001
//   })
// })

module.exports = Transactions
