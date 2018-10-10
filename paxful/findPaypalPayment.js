function findPayPalPayment(tradeChatGet) {
  let messages = ''
  for (let message of tradeChatGet) {
    messages += message.text + ' '
  }
  try {
    // removes all punctuation
    // split sentence to individual words
    // finds a string with 17 characters (which is prob transactionId)
    // ignore characters with @ sign
    return messages
      .replace(/[.,]/g, '')
      .split(' ')
      .filter(val => val.length >= 17 && val.indexOf('@') === -1)[0]
  } catch (e) {
    return null
  }
}

module.exports = findPayPalPayment
