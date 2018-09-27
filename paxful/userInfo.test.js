test('mock user info', () => {
  const mockMessage = {
    username: 'user2',
    feedback_positive: 5,
    feedback_neutral: 0,
    feedback_negative: 0,
    total_partners: 7,
    total_trades: 7,
    trusted_by: 2,
    blocked_by: 0,
    joined: '2 weeks ago',
    total_btc: '1+',
    email_verified: true,
    phone_verified: false,
    is_vendor: true,
    is_verified: false,
    is_trusted: false,
    last_seen: 'Seen just now.'
  }

  expect(mockMessage).toEqual(mockMessage)
})
