const paxful = require('.')

test('parses paypal email from message', () => {
  const mockMessage = [
    {
      text: 'this text should be ignored even if therez an email@email.com',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'Please provide your paypal email',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'my email is test@gmail.com. thanks',
      timestamp: 1537722635702,
      type: 'msg',
      author: 'theBuyer'
    }
  ]
  const email = paxful.findEmail(mockMessage, /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
  expect(email).toEqual('test@gmail.com')
})

test('no email returns false', () => {
  const mockMessage = [
    {
      text: 'this text should be ignored even if therez an email@email.com',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'Please provide your paypal email',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'i do not have an email',
      timestamp: 1537722635702,
      type: 'msg',
      author: 'theBuyer'
    }
  ]
  const email = paxful.findEmail(mockMessage, /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
  expect(email).toEqual(null)
})
