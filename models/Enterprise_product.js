const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const EnterpriseProduct = new Schema({})

module.exports = mongoose.model('EnterpriseProduct', EnterpriseProduct)
