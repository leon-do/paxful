function findEmail(tradeChatGet) {
  let messages = ''
  // i = 1 skips the intro text
  for (let i = 1; i < tradeChatGet.length; i++) {
    messages += tradeChatGet[i].text + ' '
  }
  try {
    // https://stackoverflow.com/questions/14440444/extract-all-email-addresses-from-bulk-text-using-jquery
    return messages.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0]
  } catch (e) {
    return null
  }
}

module.exports = findEmail
