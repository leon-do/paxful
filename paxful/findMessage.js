function findMessage(tradeChatGet, string) {
  let messages = ''
  // i = 1 skips the intro text
  for (let i = 2; i < tradeChatGet.length; i++) {
    messages += tradeChatGet[i].text + ' '
  }
  try {
    return messages.indexOf(string) > -1
  } catch (e) {
    return null
  }
}

module.exports = findMessage
