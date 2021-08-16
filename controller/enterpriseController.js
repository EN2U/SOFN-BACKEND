const { AsyncWrapper } = require('../utils/async-wrapper')

const Enterprise = require('../models/Enterprise')
const ErrorRequest = require('../errorHandling/requestError')

const createEnterprise = AsyncWrapper(async (req, res) => {
  const newEnterprise = new Enterprise(req.body)
  console.log(newEnterprise)
  try {
    await newEnterprise.save()
    console.log(newEnterprise)
    res.status(201).send({
      success: true,
      msg: 'Funciono xd'
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success: false,
      error: `${error}`
    })
  }
})

const updateEnterpriseDetails = AsyncWrapper(async (req, res) => {
  try {
    console.log(req.body)
    const enterprise = await Enterprise.findOneAndUpdate({ name: req.body.name, owner: req.body.owner }, req.body)
    if (!enterprise) throw new ErrorRequest('[ERROR] Enterprise not found...', 404)
    return res.status(200).send({
      success: true,
      user: enterprise,
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

const updateLogo = AsyncWrapper(async (req, res) => {
  try {
    console.log(req.body)
    const enterprise = await Enterprise.findOneAndUpdate({ name: req.body.name, owner: req.body.owner }, req.body)
    if (!enterprise) throw new ErrorRequest('[ERROR] Enterprise not found...', 404)
    return res.status(200).send({
      success: true,
      user: enterprise,
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

const updateBanner = AsyncWrapper(async (req, res) => {
  try {
    console.log(req.body)
    const enterprise = await Enterprise.findOneAndUpdate({ name: req.body.name, owner: req.body.owner }, req.body)
    if (!enterprise) throw new ErrorRequest('[ERROR] Enterprise not found...', 404)
    return res.status(200).send({
      success: true,
      user: enterprise,
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

const updateSocialMedia = AsyncWrapper(async (req, res) => {
  try {
    const enterprise = await Enterprise.findOneAndUpdate({ name: req.body.name, owner: req.body.owner }, req.body)
    if (!enterprise) throw new ErrorRequest('[ERROR] Enterprise not found...', 404)
    return res.status(200).send({
      success: true,
      user: enterprise,
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
  createEnterprise,
  updateEnterpriseDetails,
  updateLogo,
  updateBanner,
  updateSocialMedia
}
