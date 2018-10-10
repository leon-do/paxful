const config = require('./config.json')
const request = require('request')
const CryptoJS = require('crypto-js')

function tradeList() {
  let body = `apikey=${config.apikey}&nonce=${Date.now()}`
  const apiseal = CryptoJS.HmacSHA256(body, config.secret)
  body += `&apiseal=${apiseal}`
  return new Promise(resolve => {
    request(
      {
        url: 'https://paxful.com/api/trade/list',
        method: 'POST',
        body: body
      },
      (err, response) => {
        const data = JSON.parse(response.body).data.trades
        // if no data, then return false
        if (data.length === 0) {
          resolve(false)
        }
        resolve(data)
      }
    )
  })
}

module.exports = tradeList
