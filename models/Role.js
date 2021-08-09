const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const Role = new Schema({})

module.exports = mongoose.model('Role', Role)
