const Sequelize = require('sequelize');
const sequelize = require('../index')

const Transactions = sequelize.define('transactions', {
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
  }
})

// Transactions.sync({force: true}).then(() => {
//   return Transactions.create({
//     tradeHash: Math.floor(Math.random() * 1000).toString(),
//     userName: 'foobar',
//     email: 'email@email.com',
//     payPalPayment: '23faw32fawsdf'
//   })
// })

module.exports = Transactions