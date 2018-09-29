const paxful = require('./paxful')

start()
async function start() {
  // get open trades
  const tradeList = paxful.mock.tradeList || await paxful.tradeList()

  // loop through each trade
  for (let trade of tradeList) {
    // get user info
    const userInfo = await paxful.userInfo(trade.responder_username)
    
    // check if user can be trusted
    const userTrust = paxful.userTrust(userInfo)

    // if user is not trusted, then skip
    if (userTrust === false) {
      continue
    }

    // if last user trade < 24 hours, then send 'one trade per day'

    // get trade chat
    const tradeChat = await paxful.tradeChatGet(trade.trade_hash)
    
    // if user does not provide email
    const userEmail = paxful.findEmail(tradeChat, /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
    if (!userEmail) {
      // tell user to provide email if we haven't already
      const emailMessage = 'please verify your paypal email'
      if (!paxful.findEmail(tradeChat, emailMessage)){
        await paxful.tradeChatPost(trade.trade_hash, emailMessage)
      }
      continue
    }

    // tell user to send money if we haven't already
    const sendMessage = 'send amount to leondo345@gmail.com and verify your paypal transaction number'
    if (!paxful.findMessage(tradeChat, sendMessage)){
      await paxful.tradeChatPost(trade.trade_hash, sendMessage)
    }

    // if user does not provide paypal transaction
    if (!paxful.findPayPalPayment(tradeChat)) {
      console.log('waiting confirmation')
      continue
    }
}

  // if chat contains 'not enough reputation', then skip
  // const tradeList = await paxful.tradeList()
  // console.log(tradeList)

  // const userInfo = await paxful.userInfo('ldo')
  // console.log(userInfo)

  

  // const tradeChatPost = await paxful.tradeChatPost('vMoJN5Db8ox', 'hello world')
  // console.log(tradeChatPost)
}

