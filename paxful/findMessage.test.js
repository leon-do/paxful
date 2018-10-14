const paxful = require('.')

test('parses "stricktly" from message', () => {
  const mockMessage = [
    {
      text: 'this text should be ignored even if therez the word stricktly',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'hello and nice to meet you',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'I am not here to make friends. This is stricktly bizzness',
      timestamp: 1537722635702,
      type: 'msg',
      author: 'theBuyer'
    }
  ]
  const email = paxful.findMessage(mockMessage, 'stricktly')
  expect(email).toEqual(true)
})
