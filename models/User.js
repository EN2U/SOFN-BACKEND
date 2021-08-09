const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const service = require('../services/service')
const bcrypt = require('bcrypt')

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
  token: {
    type: String
  }
})

/* /////////////////////////////////////////////////////////////////////
                          User Schema Hooks
///////////////////////////////////////////////////////////////////// */

User.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

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
  console.log(user.passwoird)

  const isMatch = await bcrypt.compare(password, user.password)

  if (isMatch) return user
  else throw new ErrorRequest('[ERROR] Invalid Password', 401)
}

module.exports = mongoose.model('User', User)
