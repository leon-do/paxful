function findPayPalPayment(tradeChatGet) {
  let messages = ''
  // i = 1 skips the intro text
  for (let i = 1; i < tradeChatGet.length; i++) {
    messages += tradeChatGet[i].text + ' '
  }
  try {
    // split sentence to individual words
    // finds a string with filepicker.io
    return messages
      .split(' ')
      .filter(val => val.length >= 17 && val.indexOf('filepicker.io') > -1)[0]
  } catch (e) {
    return null
  }
}

module.exports = findPayPalPayment
