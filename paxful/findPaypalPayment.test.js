const paxful = require('./')

test('parses paypal payment from message', () => {
  const mockMessage = [
    {
      text: 'what your transaction number',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'paypal transaciton number is 6DU731575R525152F',
      timestamp: 1537722635702,
      type: 'msg',
      author: 'theBuyer'
    }
  ]
  const email = paxful.findPayPalPayment(mockMessage)
  expect(email).toEqual('6DU731575R525152F')
})

test('parses paypal payment from message with long email', () => {
  const mockMessage = [
    {
      text: 'what your transaction number',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'my email is aLongString@gmail.com paypal transaciton number is 6DU731575R525152F',
      timestamp: 1537722635702,
      type: 'msg',
      author: 'theBuyer'
    }
  ]
  const email = paxful.findPayPalPayment(mockMessage)
  expect(email).toEqual('6DU731575R525152F')
})

test('parses no paypal payment from message', () => {
  const mockMessage = [
    {
      text: 'what your transaction number',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'paypal transaciton number is nope',
      timestamp: 1537722635702,
      type: 'msg',
      author: 'theBuyer'
    }
  ]
  const email = paxful.findPayPalPayment(mockMessage)
  expect(email).toEqual(undefined)
})
