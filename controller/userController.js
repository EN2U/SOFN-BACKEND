const { AsyncWrapper } = require('../utils/async-wrapper')

const User = require('../models/User')

const registerUser = AsyncWrapper(async (req, res) => {
  const user = new User(req.body)

  try {
    if (req.body.password !== req.body.repeatPassword) throw new Error('Password doesnt match')
    await user.save()
    res.status(201).send({
      user: user,
      msg: '[SUCCESS] User created successfully!...'
    })
  } catch (error) {
    res.status(401).send({
      success: false,
      error: `${error}`
    })
  }
})

const loginUser = AsyncWrapper(async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateToken()
    res.status(200).send({
      user: user,
      token: token,
      msg: `[SUCCESS] Welcome ${user.userName}, you logged in...`
    })
  } catch (error) {
    console.log(error.status)
    res.status(error.status).send({
      success: false,
      msg: `${error.message}`
    })
  }
})

const deleteUser = AsyncWrapper(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id).exec()
    .then(doc => {
      if (!doc) return res.status(404).end()
      return res.status(204).end()
    }).catch(error => next(error))
})

const logout = AsyncWrapper(async (req, res, next) => {
  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, { token: '' })
    return res.status(200).end()
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: `${error}`
    })
  }
})

const updateUser = AsyncWrapper(async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body)
    return res.status(200).end()
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: `${error}`
    })
  }
})

const getProfile = AsyncWrapper(async (req, res) => {
  console.log('Get Profile')
  return res.status(200).send({
    success: true,
    msg: '[SUCCESS] Profile retrieved successfully...'
  })
})

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  logout,
  updateUser,
  getProfile
}
