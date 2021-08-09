const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const EnterpriseAddress = new Schema({})

module.exports = mongoose.model('EnterpriseAddress', EnterpriseAddress)
