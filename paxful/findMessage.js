function findMessage(tradeChatGet, string) {
  let messages = ''
  for (let message of tradeChatGet) {
    messages += message.text + ' '
  }
  try {
    return messages.indexOf(string) > -1
  } catch (e) {
    return null
  }
}

module.exports = findMessage
