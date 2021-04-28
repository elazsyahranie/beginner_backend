const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          next()
        }
      })
    } else {
      // console.log(result)
      return helper.response(res, 403, 'Please login first!')
    }
  },
  isAdmin: (req, res, next) => {
    console.log('middleware isAdmin running !')
    console.log(req.decodeToken)
    // check kkondisi apakah user admin atau bukan ?
    // if (conditionCheckUserRole apakkah admin? ) {
    // next()
    // } else {
    // mengembalikan response bahwa endpoint ini tidakk bias diakses oleh selain admin
    // }
    next()
  }
}
