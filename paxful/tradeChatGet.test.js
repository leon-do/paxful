test('mock get chat', () => {
  const mockMessage = [
    {
      text: 'Trade instructions by vendor, please read\ntest',
      timestamp: 1537721413954,
      type: 'trade_info'
    },
    {
      text:
        'Buyer is paying 10 USD for 0.04 USD worth of bitcoin (0.0000071 BTC) via Netflix Gift Card. 0.0000071 bitcoins (0.04 USD) is now in escrow. It is safe for the buyer to pay now. The buyer has 30 Minutes to make payment before the trade expires. Once the buyer has made payment they should click the PAID button and the trade will not expire.',
      timestamp: 1537721413956,
      type: 'trade_escrow_funded'
    },
    {
      text: 'hello',
      timestamp: 1537721555450,
      type: 'msg',
      author: 'user1'
    },

    {
      text: 'world',
      timestamp: 1537722635702,
      type: 'msg',
      author: 'user2'
    }
  ]

  expect(mockMessage).toEqual(mockMessage)
})
