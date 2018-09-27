function paypalPayment(string) {
  // removes all punctuation then finds a string with 17 characters (which is prob transactionId)
  return string.replace(/[.,]/g, '').split(' ').filter(val => val.length >= 17)[0]
}

module.exports = paypalPayment