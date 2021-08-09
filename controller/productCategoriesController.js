const { AsyncWrapper } = require('../utils/async-wrapper')
const axios = require('axios')

const ProductCategories = require('../models/ProductCategories')
const ErrorRequest = require('../errorHandling/requestError')
const _ = require('lodash')

const initializeCategories = AsyncWrapper(async (req, res) => {
  try {
    const data = await axios.get('http://localhost:3000/api/openFoodFacts/categories')
    const x = await ProductCategories.insertMany(data.data.data)
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

module.exports = {
  initializeCategories
}
