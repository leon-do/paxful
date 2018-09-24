const verify = require('./index')

test('user is reputable', () => {
  const mockUserInfo = {
    phone_verified: true,
    email_verified: true,
    feedback_positive: 99,
    feedback_neutral: 0,
    feedback_negative: 0
  }
  const isReputable = verify.userReputation(mockUserInfo)
  expect(isReputable).toEqual(true)
})

test('user is not reputable b/c not enough postive feedback', () => {
  const mockUserInfo = {
    phone_verified: true,
    email_verified: true,
    feedback_positive: 0,
    feedback_neutral: 0,
    feedback_negative: 0
  }
  const isReputable = verify.userReputation(mockUserInfo)
  expect(isReputable).toEqual(false)
})

test('user is not reputable b/c too many negative feedback', () => {
  const mockUserInfo = {
    phone_verified: true,
    email_verified: true,
    feedback_positive: 0,
    feedback_neutral: 99,
    feedback_negative: 0
  }
  const isReputable = verify.userReputation(mockUserInfo)
  expect(isReputable).toEqual(false)
})

test('user is not reputable b/c not phone verified', () => {
  const mockUserInfo = {
    phone_verified: false,
    email_verified: true,
    feedback_positive: 99,
    feedback_neutral: 0,
    feedback_negative: 0
  }
  const isReputable = verify.userReputation(mockUserInfo)
  expect(isReputable).toEqual(false)
})

test('user is not reputable b/c not email verified', () => {
  const mockUserInfo = {
    phone_verified: true,
    email_verified: false,
    feedback_positive: 99,
    feedback_neutral: 0,
    feedback_negative: 0
  }
  const isReputable = verify.userReputation(mockUserInfo)
  expect(isReputable).toEqual(false)
})
