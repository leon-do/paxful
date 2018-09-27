const verify = require('./index')

test('parses paypal email from message', () => {
  const mockMessage = [
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
  const email = verify.paypalEmail(mockMessage)
  expect(email).toEqual('test@gmail.com')
})

test('no email returns false', () => {
  const mockMessage = [
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
  const email = verify.paypalEmail(mockMessage)
  expect(email).toEqual(false)
})