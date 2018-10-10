require('./db')
const Transactions = require('./db/models/Transactions')
const paxful = require('./paxful')

start()
async function start() {
  // get open trades
  const tradeList = await paxful.tradeList() || paxful.mock.tradeList

  // loop through each trade
  for (let trade of tradeList) {
    // get user info
    const userInfo = await paxful.userInfo(trade.responder_username)

    // check if user can be trusted
    const userTrust = paxful.userTrust(userInfo)

    // if user is not trusted, then skip
    if (!userTrust) {
      continue
    }

    // get last trade
    const lastTrade = await Transactions.findAll({
      where: {
        userName: trade.responder_username
      },
      order: [['createdAt', 'DESC']]
    })

    // if user has traded before and their last trade was within 30 days
    const thirdyDays = 1000 * 60 * 60 * 24 * 30
    if (lastTrade.length >= 1 && Date.now() - lastTrade[0].createdAt.getTime() < thirdyDays) {
      continue
    }

    // get trade chat
    const tradeChat = await paxful.tradeChatGet(trade.trade_hash)

    // if user does not provide email
    const userEmail = paxful.findEmail(tradeChat, /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
    if (!userEmail) {
      // tell user to provide email if we haven't already
      const emailMessage = 'hello. please provide your paypal email'
      if (!paxful.findMessage(tradeChat, emailMessage)) {
        await paxful.tradeChatPost(trade.trade_hash, emailMessage)
      }
      continue
    }

    // tell user to send money if we haven't already
    const sendMessage = 'send amount to foobar@aol.org and provide your paypal transaction number'
    if (!paxful.findMessage(tradeChat, sendMessage)) {
      // https://www.degraeve.com/reference/urlencoding.php
      await paxful.tradeChatPost(trade.trade_hash, sendMessage)
    }

    // if user does not provide paypal transaction
    const payPalPayment = paxful.findPayPalPayment(tradeChat)
    if (!payPalPayment) {
      continue
    }

    // user has verified. save
    await Transactions.create({
      isComplete: false,
      tradeHash: trade.trade_hash,
      userName: trade.responder_username,
      email: userEmail,
      payPalPayment: payPalPayment
    })
  }

  // start again
  await pause(5000)
  start()
}

function pause(milliseconds) {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, milliseconds)
  })
}
