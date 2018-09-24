const paxful = require('./paxful')

init()
async function init() {
  const tradeList = await paxful.tradeList()
  console.log(tradeList)

  const userInfo = await paxful.userInfo('ldo')
  console.log(userInfo)

  const tradeChatGet = await paxful.tradeChatGet('vMoJN5Db8ox')
  console.log(tradeChatGet)

  const tradeChatPost = await paxful.tradeChatPost('vMoJN5Db8ox', 'hello world')
  console.log(tradeChatPost)
}
