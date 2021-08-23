const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const PriceProduct = new Schema({
  _id: {
    type: Number,
    required: true
  },
  product_name: {
    type: String
  },
  product_name_es: {
    type: String
  },
  price: {
    type: Number
  }
})

module.exports = mongoose.model('PriceProduct', PriceProduct)
