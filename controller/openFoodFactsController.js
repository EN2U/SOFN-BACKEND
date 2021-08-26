const axios = require('axios')
const AsyncWrapper = require('../utils/async-wrapper').AsyncWrapper
const _ = require('lodash')
const openFoodFactsUtils = require('../utils/openFoodFacts')

const openFoodFactsCategories = 'https://es.openfoodfacts.org/categories.json'

/* ////////////////////////////////////////////////////////////////
                Get elements if no filters selected
//////////////////////////////////////////////////////////////// */

// _id, product_name, generic_name_es, allergens, brands
const openFoodFactsElements = AsyncWrapper(async (req, res) => {
  if (Object.keys(req.body).length === 1) {
    try {
      const config = {
        method: 'get',
        url: `https://es.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&page_size=96&json=true%22&page=${req.body.page}`,
        headers: {
          authority: 'es.openfoodfacts.org',
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
          'sec-ch-ua-mobile': '?0',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'sec-fetch-site': 'none',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-user': '?1',
          'sec-fetch-dest': 'document',
          'accept-language': 'es-ES,es;q=0.9,en;q=0.8'
        }
      }
      const openFoodFactsProducts = await axios(config)
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
const openFoodFactsFindByProduct = AsyncWrapper(async (req, res) => {
  if (Object.keys(req.body).length === 2) {
    try {
      const config = {
        method: 'get',
        url: `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${req.body.product}&search_simple=1&action=process&page_size=96&json=true&page=${req.body.page}`,
        headers: {
          authority: 'es.openfoodfacts.org',
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
          'sec-ch-ua-mobile': '?0',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'sec-fetch-site': 'none',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-user': '?1',
          'sec-fetch-dest': 'document',
          'accept-language': 'es-ES,es;q=0.9,en;q=0.8'
        }
      }

      const openFoodFactsProducts = await axios(config)
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
  openFoodFactsFindByProduct,
  getCategories
}
