const ErrorRequest = require('../errorHandling/requestError')

module.exports = function (error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new ErrorRequest('[ERROR] There was a duplicate key error', 400))
  } else {
    next()
  }
}
