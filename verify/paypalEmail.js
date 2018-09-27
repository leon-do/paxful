function paypalEmail(tradeChatGet) {
  let messages = ''
  for (let message of tradeChatGet) {
    messages += message.text + ' '
  }
  try {
    // https://stackoverflow.com/questions/14440444/extract-all-email-addresses-from-bulk-text-using-jquery
    return messages.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0]
  } catch (e) {
    return false
  }
}

module.exports = paypalEmail
