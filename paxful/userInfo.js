const config = require('./config.json')
const request = require('request')
const CryptoJS = require('crypto-js')

function userInfo(username) {
    let body = `apikey=${config.apikey}&nonce=${Date.now()}&username=${username}`
    const apiseal = CryptoJS.HmacSHA256(body, config.secret)
    body += `&apiseal=${apiseal}`
    return new Promise(resolve => {
        request(
            {
                url: 'https://paxful.com/api/user/info',
                method: 'POST',
                body: body
            },
            (err, response) => {
                const data = JSON.parse(response.body).data
                resolve(data)
            }
        )
    })
}

module.exports = userInfo
