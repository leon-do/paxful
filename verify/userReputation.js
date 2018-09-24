/*
{ username: 'Satoshi',
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
  last_seen: 'Seen 21 hours ago.' }
*/

function userReputation(userInfo) {
  const isPhoneVerified = userInfo.phone_verified
  const isEmailVerified = userInfo.email_verified
  const positiveFeedback = userInfo.feedback_positive
  const neutralFeedback = userInfo.feedback_neutral
  const negativeFeedback = userInfo.feedback_negative
  const totalFeedback = positiveFeedback + neutralFeedback + negativeFeedback
  return isPhoneVerified && isEmailVerified && positiveFeedback > 5 && positiveFeedback / totalFeedback >= 0.9
}

module.exports = userReputation
