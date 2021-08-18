const { AsyncWrapper } = require('../utils/async-wrapper')

const Enterprise = require('../models/Enterprise')
const ErrorRequest = require('../errorHandling/requestError')

const initializeCSV = AsyncWrapper(async (req, res) => {
  console.log(':D')
})

module.exports = {
  initializeCSV
}
