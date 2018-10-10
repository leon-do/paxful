// https://www.degraeve.com/reference/urlencoding.php

const config = require('./config.json')
const request = require('request')
const CryptoJS = require('crypto-js')

function tradeChatPost(tradeHash, message) {
  let body = `apikey=${config.apikey}&nonce=${Date.now()}&trade_hash=${tradeHash}&message=${encodeURIComponent(message)}`
  const apiseal = CryptoJS.HmacSHA256(body, config.secret)
  body += `&apiseal=${apiseal}`
  return new Promise(resolve => {
    request(
      {
        url: 'https://paxful.com/api/trade-chat/post',
        method: 'POST',
        body: body
      },
      (err, response) => {
        const data = JSON.parse(response.body)
        resolve(data)
      }
    )
  })
}

module.exports = tradeChatPost
