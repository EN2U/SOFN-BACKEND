const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const ProductCategories = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  }
})

module.exports = mongoose.model('ProductCategories', ProductCategories)
