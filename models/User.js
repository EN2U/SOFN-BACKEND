const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')
const schemaMiddlewareError = require('../middleware/schemaError')

const service = require('../services/service')
const bcrypt = require('bcryptjs')

const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const User = new Schema({
  email: {
    type: String,
    required: [true, 'Please include your email...'],
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please include your password...'],
    minlength: 6
  },
  role: {
    type: String,
    required: [true, 'Please include your role']
  },
  token: {
    type: String
  }
})

/* /////////////////////////////////////////////////////////////////////
                          User Schema Hooks
///////////////////////////////////////////////////////////////////// */

User.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

User.post('save', schemaMiddlewareError)

User.pre('findOneAndUpdate', function (next) {
  this._update.password = bcrypt.hashSync(this._update.password, 10)
  next()
})

User.pre('findOneAndDelete', function (next) {
  next()
})

/* /////////////////////////////////////////////////////////////////////
                          User Schema Methods
///////////////////////////////////////////////////////////////////// */

User.methods.generateToken = async function () {
  const user = this
  const token = service.createToken(user)
  user.token = token
  await user.save()

  return token
}

/* /////////////////////////////////////////////////////////////////////
                          User Schema Statics
///////////////////////////////////////////////////////////////////// */

User.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email: email })
  if (!user) throw new ErrorRequest('[ERROR] Invalid Email', 401)

  const isMatch = bcrypt.compareSync(password, user.password)

  if (isMatch) return user
  else throw new ErrorRequest('[ERROR] Invalid Password', 401)
}

User.statics.findByUserId = async function (userId, password) {
  const user = await this.findOne({ _id: userId })
  if (!user) throw new ErrorRequest('[ERROR] Invalid User', 401)
  const isMatch = bcrypt.compareSync(password, user.password)
  if (isMatch) return user
  else throw new ErrorRequest('[ERROR] Invalid password', 401)
}

module.exports = mongoose.model('User', User)
