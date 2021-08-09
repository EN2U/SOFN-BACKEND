const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const ProductCategories = new Schema({})

module.exports = mongoose.model('ProductCategories', ProductCategories)
