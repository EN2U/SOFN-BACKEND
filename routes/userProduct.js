const express = require('express')
const userProductController = require('../controller/userProductController')
const auth = require('../middleware/auth')

const router = express.Router()

/* ///////////////////////////////////////////////
                Get petitions
/////////////////////////////////////////////// */

router.get('/myProducts/:id', auth, userProductController.getProducts)
router.get('/:id', auth, userProductController.getAllProducts)

/* ///////////////////////////////////////////////
                Post petitions
/////////////////////////////////////////////// */

router.post('/addProduct/:id', auth, userProductController.addProduct)
router.post('/searchProduct/:id', auth, userProductController.searchProduct)

/* ///////////////////////////////////////////////
                Delete petitions
/////////////////////////////////////////////// */

router.delete('/:id', auth, userProductController.deleteProduct)

/* ///////////////////////////////////////////////
                Put petitions
/////////////////////////////////////////////// */

router.put('/:id', auth, userProductController.updateProduct)

module.exports = router
