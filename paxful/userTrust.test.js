const paxful = require('.')

test('user is reputable', () => {
  const mockUserInfo = {
    phone_verified: true,
    email_verified: true,
    feedback_positive: 99,
    feedback_neutral: 0,
    feedback_negative: 0
  }
  const isReputable = paxful.userTrust(mockUserInfo)
  expect(isReputable).toEqual(true)
})