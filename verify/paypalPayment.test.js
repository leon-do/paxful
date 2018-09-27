const verify = require('./index')

test('parses paypal payment from message', () => {
  const mockMessage = 'my transaction number is 6DU731575R525152F.'
  const email = verify.paypalPayment(mockMessage)
  expect(email).toEqual('6DU731575R525152F')
})

test('parses no paypal payment from message', () => {
  const mockMessage = 'my transaction number is 6DU731575R525152'
  const email = verify.paypalPayment(mockMessage)
  expect(email).toEqual(undefined)
})