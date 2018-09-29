function findPayPalPayment(tradeChatGet) {
  let messages = ''
  for (let message of tradeChatGet) {
    messages += message.text + ' '
  }
  try {
    // removes all punctuation then finds a string with 17 characters (which is prob transactionId)
    return messages
      .replace(/[.,]/g, '')
      .split(' ')
      .filter(val => val.length >= 17)[0]
  } catch (e) {
    return null
  }
}

module.exports = findPayPalPayment
