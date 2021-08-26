const { AsyncWrapper } = require('../utils/async-wrapper')

const User = require('../models/User')
const ErrorRequest = require('../errorHandling/requestError')

/* /////////////////////////////////////////////////////////////////////
                            Get petitions
///////////////////////////////////////////////////////////////////// */

const getProfile = AsyncWrapper(async (req, res) => {
  try {
    const profile = await User.findOne({ _id: req.params.id })
    if (!profile) throw new ErrorRequest('[ERROR] Profile not found...', 404)
    profile.password = undefined
    return res.status(200).send({
      profile: profile,
      success: true,
      msg: '[SUCCESS] Profile retrieved successfully!...'
    })
  } catch (error) {
    if (error.status !== undefined) {
      return res.status(error.status).send({
        success: false,
        error: `${error.message}`
      })
    } else {
      return res.status(400).json({
        success: false,
        error: `${error}`
      })
    }
  }
})

/* /////////////////////////////////////////////////////////////////////
                            Post petitions
///////////////////////////////////////////////////////////////////// */

const signup = AsyncWrapper(async (req, res, next) => {
  req.body.role = 'user'
  const user = new User(req.body)
  try {
    if (req.body.password !== req.body.confirmPassword) {
      throw new ErrorRequest('[ERROR] password doesnt match...', 400)
    }
    const isValid = await user.save()
    if (!isValid) throw new ErrorRequest('[ERROR] Error saving user...', 400)
    return res.status(201).send({
      success: true,
      user: user,
      msg: '[SUCCESS] User created successfully!...'
    })
  } catch (error) {
    if (error.status !== undefined) {
      return res.status(error.status).send({
        success: false,
        error: `${error.message}`
      })
    } else {
      return res.status(400).json({
        success: false,
        error: `${error}`
      })
    }
  }
})

const loginUser = AsyncWrapper(async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    if (!user) throw new ErrorRequest('[ERROR] User not found...', 404)
    const token = await user.generateToken()
    return res.status(200).send({
      user: user._id,
      role: user.role,
      token: token,
      email: user.email,
      success: true,
      msg: `[SUCCESS] Welcome ${user.email}, you logged in...`
    })
  } catch (error) {
    if (error.status !== undefined) {
      return res.status(error.status).send({
        success: false,
        error: `${error.message}`
      })
    } else {
      return res.status(401).json({
        success: false,
        error: `${error}`
      })
    }
  }
})

const logout = AsyncWrapper(async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, { token: '' })
    if (!user) throw new ErrorRequest('[ERROR] User not found...', 404)
    return res.status(200).send({
      success: true,
      msg: '[SUCCESS] Logout successfully!...'
    })
  } catch (error) {
    if (error.status !== undefined) {
      return res.status(error.status).send({
        success: false,
        error: `${error.message}`
      })
    } else {
      return res.status(401).json({
        success: false,
        error: `${error}`
      })
    }
  }
})

/* /////////////////////////////////////////////////////////////////////
                            Delete petitions
///////////////////////////////////////////////////////////////////// */

const deleteUser = AsyncWrapper(async (req, res, next) => {
  try {
    const user = await User.findByUserId(req.params.id, req.body.password)
    if (!user) throw new ErrorRequest('[ERROR] User not found...', 404)

    await user.remove()

    return res.status(200).send({
      success: true,
      msg: '[SUCCESS] User deleted successfully'
    })
  } catch (error) {
    if (error.status !== undefined) {
      return res.status(error.status).send({
        success: false,
        error: `${error.message}`
      })
    } else {
      return res.status(400).json({
        success: false,
        error: `${error}`
      })
    }
  }
})

/* /////////////////////////////////////////////////////////////////////
                            Put petitions
///////////////////////////////////////////////////////////////////// */

const updateUser = AsyncWrapper(async (req, res) => {
  try {
    const user = await User.findByUserId(req.params.id, req.body.password)
    if (!user) throw new ErrorRequest('[ERROR] User not found...', 404)

    user.email = req.body.email
    if (req.body.newPassword !== '') {
      user.password = req.body.newPassword
      await user.save()
    } else await user.save()

    return res.status(200).send({
      success: true,
      email: user.email,
      msg: '[SUCCESS] User updated successfully!...'
    })
  } catch (error) {
    if (error.status !== undefined) {
      return res.status(error.status).send({
        success: false,
        error: `${error.message}`
      })
    } else {
      return res.status(400).json({
        success: false,
        error: `${error}`
      })
    }
  }
})

module.exports = {
  getProfile,
  signup,
  loginUser,
  logout,
  deleteUser,
  updateUser
}
