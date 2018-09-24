function paypalEmail(tradeChatGet) {
  let messages = ''
  for (let message of tradeChatGet) {
    messages += message.text + ' '
  }
  try {
    return messages.match(/\S+[a-z0-9]@[a-z0-9\.]+/img)[0]
  } catch (e) {
    return false
  }
}

module.exports = paypalEmail
