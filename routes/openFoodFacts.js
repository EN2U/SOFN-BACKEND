const express = require('express')
const openFoodFactsController = require('../controller/openFoodFactsController')

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     allElements:
 *       type: object
 *       required:
 *         - page
 *       properties:
 *         page:
 *           type: integer
 *           description: Page of the elements to retrieve from open food facts
 *       example:
 *          page: 1
 *     searchElement:
 *        type: object
 *        required:
 *          - page
 *          - product
 *        properties:
 *          page:
 *            type: integer
 *            description: Page of the elements to retrieve from open food facts
 *          product:
 *            type: string
 *            description: Name of the product to search
 *        example:
 *          page: 1
 *          product: chocolate
 */       

 /**
  * @swagger
  * tags:
  *   name: OpenFoodFacts
  *   description: OpenFoodFacts API
  */

 /**
 * @swagger
 * /api/openFoodFacts/allElements:
 *   post:
 *     summary: Returns the list of all products
 *     tags: [OpenFoodFacts]
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/allElements'
 *     responses:
 *       200:
 *         description: Returns the first 24 spanish elements of openFoodFacts.
 *       204:
 *         description: Reached the last page with products avalaible.
 *       400:
 *         description: No page selected.  
 *       500:
 *         description: Comunication with the endpoint not working
 */
router.post('/allElements', openFoodFactsController.openFoodFactsElements)
 
/**
 * @swagger
 * /api/openFoodFacts/searchElement:
 *   post:
 *     summary: Returns the list of all products
 *     tags: [OpenFoodFacts]
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/searchElement'
 *     responses:
 *       200:
 *         description: Returns the first 24 spanish elements of openFoodFacts filtered by name of the product.
 *       204:
 *         description: Reached the last page with products avalaible.
 *       400:
 *         description: No page selected.  
 *       500:
 *         description: Comunication with the endpoint not working
 */
router.post('/searchElement', openFoodFactsController.openFoodFactsSeacrchELements)

module.exports = router