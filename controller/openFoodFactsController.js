const axios = require('axios')
const asyncWrapper = require('../utils/async-wrapper').AsyncWrapper

const openFoodFactsUrl = 'https://es.openfoodfacts.org/'
const openFoodFactsCategoryUrl = 'https://es.openfoodfacts.org/categoria/'

/* ////////////////////////////////////////////////////////////////
                Get elements if no filters selected
//////////////////////////////////////////////////////////////// */
const openFoodFactsElements = asyncWrapper(async (req, res) => {
  if (Object.keys(req.body).length === 1) {
    const data = await axios.get(`${openFoodFactsUrl}${req.body.page}.json`)
      .then(res => res.data)

    if (data.products.length !== 0) {
      res.status(200).json({
        data: data,
        success: true,
        msg: '[SUCCESS] Elements retrieved successfully...!'
      })
    } else {
      res.status(204).json({
        data: data,
        success: true,
        msg: '[SUCCESS] No content available...!'
      })
    }
  } else {
    res.status(400).json({
      success: false,
      msg: '[ERROR] No page specified...'
    })
  }
})

/* ////////////////////////////////////////////////////////////////
                Get producst filtered by name
//////////////////////////////////////////////////////////////// */
const openFoodFactsSeacrchELements = asyncWrapper(async (req, res) => {
  if (Object.keys(req.body).length === 2) {
    const data = await axios.get(`${openFoodFactsCategoryUrl}${req.body.product}/${req.body.page}.json`)
      .then(res => res.data)

    if (data.products.length !== 0) {
      res.status(200).json({
        data: data,
        success: true,
        msg: '[SUCCESS] Elements retrieved successfully...!'
      })
    } else {
      res.status(204).json({
        data: data,
        success: true,
        msg: '[SUCCESS] No content available...!'
      })
    }
  } else {
    res.status(400).json({
      success: false,
      msg: '[ERROR] No page or product specified...!'
    })
  }
})

module.exports = {
  openFoodFactsElements,
  openFoodFactsSeacrchELements
}
