const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const Role = new Schema({
  name: {
    type: String
  }
})

module.exports = mongoose.model('Role', Role)
