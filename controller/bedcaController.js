const { AsyncWrapper } = require('../utils/async-wrapper')

const Bedca = require('../models/Bedca')
const ErrorRequest = require('../errorHandling/requestError')

const initializeCSV = AsyncWrapper(async (req, res) => {
  const json = require('../data/parsedJson.json')
  try {
    const x = await Bedca.insertMany(json)
    console.log(x)
    return res.status(200).send({
      status: true,
      msg: 'all saved'
    })
  } catch (error) {
    return res.status(400).send({
      status: false,
      msg: error
    })
  }
})

const bedcaProducts = AsyncWrapper(async (req, res) => {
  try {
    const bedcaList = await Bedca.find()
    if (!bedcaList) throw new ErrorRequest('[ERROR] Something unexpected happened...', 400)
    return res.status(200).send({
      bedcaList: bedcaList,
      success: true,
      msg: '[SUCCESS] Retrieve all bedca'
    })
  } catch (error) {
    if (error.status !== undefined) {
      return res.status(error.AsyncWrapper.status).send({
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
  initializeCSV,
  bedcaProducts
}
