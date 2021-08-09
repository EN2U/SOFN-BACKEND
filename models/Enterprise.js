const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const Enterprise = new Schema({})

module.exports = mongoose.model('Enterprise', Enterprise)
