const express = require('express')
const productCategoriesController = require('../controller/productCategoriesController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', productCategoriesController.initializeCategories)

router.get('/', productCategoriesController.getCategories)

module.exports = router
