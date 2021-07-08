const express = require('express')
const openFoodFactsController = require('../controller/openFoodFactsController')


const router = express.Router()
const openFoodFactsCategoryUrl = 'https://es.openfoodfacts.org/categoria/'


/* ////////////////////////////////////////////////////////////////
                Get elements if no filters selected
//////////////////////////////////////////////////////////////// */
router.get('/allElements', openFoodFactsController.openFoodFactsElements)

/* ////////////////////////////////////////////////////////////////
                Get producst filtered by name
//////////////////////////////////////////////////////////////// */
router.get('/searchElement', openFoodFactsController.openFoodFactsSeacrchELements)


module.exports = router