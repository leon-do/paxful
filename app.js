require('./db')
const Transactions = require('./db/models/Transactions')
const paxful = require('./paxful')

try {
  start()
} catch (e) {
  // try again in 15 min
  setTimeout(() => {
    start()
  }, 1000 * 60 * 15)
}

async function start() {
  // pause
  await pause(1000 * 5)

  // get list of open trades
  const tradeList = (await paxful.tradeList()) || [] // paxful.mock.tradeList

  // log list of open trades
  console.log(tradeList.map(val => `https://paxful.com/trade/${val.trade_hash}`))

  // loop through each trade from the trade list
  for (let trade of tradeList) {
    // pause
    await pause(1000 * 5)

    // get user info
    const userInfo = await paxful.userInfo(trade.responder_username)

    // if user is not trusted, then skip
    if (!paxful.userTrust(userInfo)) {
      continue
    }

    // get last completed trade
    const lastTrade = await Transactions.findAll({
      where: {
        userName: trade.responder_username,
        isComplete: true
      },
      order: [['createdAt', 'DESC']]
    })

    // if user has traded before and their last trade was within 30 days, then skip
    const thirdyDays = 1000 * 60 * 60 * 24 * 30
    if (lastTrade.length >= 1 && Date.now() - lastTrade[0].createdAt.getTime() < thirdyDays) {
      continue
    }

    // get trade chat
    const tradeChat = await paxful.tradeChatGet(trade.trade_hash)

    // if user does not provide email
    if (!paxful.findEmail(tradeChat, /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) {
      // tell user to provide email if we haven't already
      const emailMessage = 'hello. please provide your paypal email'
      if (!paxful.findMessage(tradeChat, emailMessage)) {
        await paxful.tradeChatPost(trade.trade_hash, emailMessage)
      }
      continue
    }

    // tell user to send money if we haven't already
    const sendMessage = `send ${trade.fiat_amount_requested} dollars to SatoshiDoe@gmail.com then upload a screenshot of the transaction. click PAID when done`
    if (!paxful.findMessage(tradeChat, sendMessage)) {
      await paxful.tradeChatPost(trade.trade_hash, sendMessage)
    }

    // if user does not upload a screenshot of payment, then skip
    const payPalPayment = paxful.findPayPalPayment(tradeChat)
    if (!payPalPayment) {
      continue
    }

    // save to db if not already saved
    const isSaved = await Transactions.findOne({
      where: {
        tradeHash: trade.trade_hash
      }
    })
    if (!isSaved) {
      await Transactions.create({
        isComplete: false,
        tradeHash: trade.trade_hash,
        userName: trade.responder_username,
        email: userEmail,
        payPalPayment: payPalPayment,
        dollars: Number(trade.fiat_amount_requested),
        bitcoin: Number(trade.crypto_amount_requested) / 100000000
      })
    }

    // verifying transaction...
    const verifyMessage = 'verifying transaction. please provide feedback when bitcoin has been released'
    if (!paxful.findMessage(tradeChat, verifyMessage)) {
      await paxful.tradeChatPost(trade.trade_hash, verifyMessage)
    }

    /*
    1. check email for paypal confirmation
    2. make sure transaction in chat matches email
    3. release bitcoins
    4. your funds have been released. please provide feedback. I will do the same.
    */
  }

  // start again
  start()
}

function pause(milliseconds) {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, milliseconds)
  })
}
