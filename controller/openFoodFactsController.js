const axios = require('axios')
const AsyncWrapper = require('../utils/async-wrapper').AsyncWrapper
const _ = require('lodash')
const openFoodFactsUtils = require('../utils/openFoodFacts')

const openFoodFactsUrl =
'https://es.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&page_size=96&json=true%22&page='
const openFoodFactsCategoryUrl = 'https://es.openfoodfacts.org/cgi/search.pl?search_terms=chocolate&search_simple=1&action=process'

const openFoodFactsCategories = 'https://es.openfoodfacts.org/categories.json'

/* ////////////////////////////////////////////////////////////////
                Get elements if no filters selected
//////////////////////////////////////////////////////////////// */

// _id, product_name, generic_name_es, allergens, brands
const openFoodFactsElements = AsyncWrapper(async (req, res) => {
  if (Object.keys(req.body).length === 1) {
    try {
      console.log(req.body.page)
      const openFoodFactsProducts = await axios.get(`${openFoodFactsUrl}${req.body.page}`)
      const maxItems = openFoodFactsProducts.data.count
      const formatedProducts = openFoodFactsUtils.parseOpenFoodFacts(openFoodFactsProducts.data.products.map(element => _.pick(element, ['_id', 'product_name', 'product_name_es', 'allergens', 'brands', 'stores', 'nutriments', 'image_url', 'nutrition_data_per'])))

      if (formatedProducts.length !== 0) {
        return res.status(200).json({
          data: formatedProducts,
          maxItems: maxItems,
          success: true,
          msg: '[SUCCESS] Elements retrieved successfully...!'
        })
      } else {
        return res.status(204).json({
          data: formatedProducts,
          success: true,
          msg: '[SUCCESS] No content available...!'
        })
      }
    } catch (error) {
      if (error.status !== undefined) {
        return res.status(error.status).send({
          success: false,
          error: `${error.message}`
        })
      } else {
        return res.status(400).send({
          success: false,
          error: `${error}`
        })
      }
    }
  } else {
    return res.status(400).json({
      success: false,
      msg: '[ERROR] No page specified...'
    })
  }
})

/* ////////////////////////////////////////////////////////////////
                Get producst filtered by name
//////////////////////////////////////////////////////////////// */
const openFoodFactsSeacrchELements = AsyncWrapper(async (req, res) => {
  if (Object.keys(req.body).length === 2) {
    try {
      console.log(req.body.page)
      const openFoodFactsProducts = await axios.get(`${openFoodFactsUrl}${req.body.page}`)
      const maxItems = openFoodFactsProducts.data.count
      const formatedProducts = openFoodFactsUtils.parseOpenFoodFacts(openFoodFactsProducts.data.products.map(element => _.pick(element, ['_id', 'product_name', 'product_name_es', 'allergens', 'brands', 'stores', 'nutriments', 'image_url', 'nutrition_data_per'])))

      if (formatedProducts.length !== 0) {
        return res.status(200).json({
          data: formatedProducts,
          maxItems: maxItems,
          success: true,
          msg: '[SUCCESS] Elements retrieved successfully...!'
        })
      } else {
        return res.status(204).json({
          data: formatedProducts,
          success: true,
          msg: '[SUCCESS] No content available...!'
        })
      }
    } catch (error) {
      if (error.status !== undefined) {
        return res.status(error.status).send({
          success: false,
          error: `${error.message}`
        })
      } else {
        return res.status(400).send({
          success: false,
          error: `${error}`
        })
      }
    }
  } else {
    return res.status(400).json({
      success: false,
      msg: '[ERROR] No values specified...'
    })
  }
})

const getCategories = AsyncWrapper(async (req, res) => {
  try {
    let data = await axios.get(openFoodFactsCategories)
    data = data.data.tags.map(category => _.pick(category, ['id', 'name']))
    return res.status(200).send({
      success: true,
      data: data
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: error
    })
  }
})

module.exports = {
  openFoodFactsElements,
  openFoodFactsSeacrchELements,
  getCategories
}
