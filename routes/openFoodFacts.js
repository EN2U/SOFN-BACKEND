const express = require('express')
const openFoodFactsController = require('../controller/openFoodFactsController')


const router = express.Router()


/* ////////////////////////////////////////////////////////////////
                Get elements if no filters selected
//////////////////////////////////////////////////////////////// */
router.get('/allElements', openFoodFactsController.openFoodFactsElements)

/* ////////////////////////////////////////////////////////////////
                Get producst filtered by name
//////////////////////////////////////////////////////////////// */
router.get('/searchElement', openFoodFactsController.openFoodFactsSeacrchELements)


module.exports = router