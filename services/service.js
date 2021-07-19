const jwt = require('jsonwebtoken')
let config = require("./config")

exports.createToken = function (user) {
  const payload = { _id: user._id, userName: user.userName, email: user.email }
  return jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: 86400000 })
};
