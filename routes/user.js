const express = require('express')
const userController = require('../controller/userController')

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       required:
 *         - userName
 *         - fullName
 *         - street
 *         - phone
 *         - email
 *         - password
 *       properties:
 *         userName:
 *           type: String
 *           description: User name account.
 *         fullName:
 *           type: String
 *           description: Full name of the user
 *         street:
 *           type: String
 *           description: Street where the user lives in
 *         number: 
 *           type: Number
 *           description: Number of the house
 *         phone: 
 *           type: Number
 *           description: Telephone contact
 *         email:
 *           type: String
 *           description: Mail contact
 *         password:
 *           type: string
 *           description: Password account
 *         repeatPassword:
 *           type: string
 *           description: Security attribute to check if the password was successfully introduced  
 *       example:
 *          userName: test
 *          fullName: test
 *          street: test
 *          number: 9
 *          phone: 666666666
 *          email: test@gmail.com
 *          password: 1234
 *          repeatPassword: 1234
 */       

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: User account info endpoints
  */

 /**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *     responses:
 *       201:
 *         description: Registration was successfull.
 *       400:
 *         description: Error when trying to save the new user on database.
 *       422:
 *         description: Password, mail or username with bad format.  
 *       500:
 *         description: Comunication with the endpoint not working
 */

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser)
module.exports = router