const express = require('express')
const productCategoriesController = require('../controller/productCategoriesController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, productCategoriesController.initializeCategories)

router.get('/', auth, productCategoriesController.getCategories)

module.exports = router
