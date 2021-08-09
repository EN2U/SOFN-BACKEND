const { AsyncWrapper } = require('../utils/async-wrapper')

const Enterprise = require('../models/Enterprise')
const ErrorRequest = require('../errorHandling/requestError')

const createEnterprise = AsyncWrapper(async (req, res) => {
  const newEnterprise = new Enterprise(req.body)

  try {
    await newEnterprise.save()
    console.log(newEnterprise)
    res.status(201).send({
      success: true,
      msg: 'Funciono xd'
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: `${error}`
    })
  }
})

module.exports = {
  createEnterprise
}
