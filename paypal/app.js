var app = require('express')()
var ipn = require('express-ipn')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false })) // IPN data is sent in the body as x-www-form-urlencoded data
app.post('/', ipn.validator(validationHandler))

function validationHandler(err, ipnContent) {
  if (err) {
    console.error('IPN invalid') // The IPN was invalid
  } else {
    console.log(ipnContent) // The IPN was valid.
  }
}

app.listen(8080, () => console.log(8080))
