const paxful = require('./')

test('parses paypal payment from message', () => {
  const mockMessage = [
    {
      text: 'some intro chat BS',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'what your transaction number',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'theSeller'
    },
    {
      text: 'paypal transaciton number is https://www.filepicker.io/api/file/0c1yvKj6TKGTXwBUt3k3/convert?quality=80',
      timestamp: 1537722635702,
      type: 'msg',
      author: 'theBuyer'
    }
  ]
  const email = paxful.findPayPalPayment(mockMessage)
  expect(email).toEqual('https://www.filepicker.io/api/file/0c1yvKj6TKGTXwBUt3k3/convert?quality=80')
})
