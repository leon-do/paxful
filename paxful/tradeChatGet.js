const config = require('./config.json')
const request = require('request')
const CryptoJS = require('crypto-js')

function tradeChatGet(tradeHash) {
  let body = `apikey=${config.apikey}&nonce=${Date.now()}&trade_hash=${tradeHash}`
  const apiseal = CryptoJS.HmacSHA256(body, config.secret)
  body += `&apiseal=${apiseal}`
  return new Promise(resolve => {
    request(
      {
        url: 'https://paxful.com/api/trade-chat/get',
        method: 'POST',
        body: body
      },
      (err, response) => {
        const data = JSON.parse(response.body).data.messages
        resolve(data)
      }
    )
  })
}

module.exports = tradeChatGet
