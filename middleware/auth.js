const jwt = require('jsonwebtoken')
const config = require('../services/config')
const ErrorRequest = require('../errorHandling/requestError')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, config.TOKEN_SECRET)
    const userId = decodedToken._id
    if (req.params.id && req.params.id !== userId) throw new ErrorRequest('[ERROR] User ID not authorized', 401)
    else next()
  } catch (error) {
    if (error.status !== undefined) {
      return res.status(error.status).send({
        success: false,
        error: `${error.message}`
      })
    } else {
      return res.status(401).json({
        success: false,
        error: `${error}`
      })
    }
  }
}
