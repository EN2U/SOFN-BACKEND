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
 *           type: string
 *           description: User name account.
 *         fullName:
 *           type: string
 *           description: Full name of the user
 *         street:
 *           type: string
 *           description: Street where the user lives in
 *         number: 
 *           type: number
 *           description: Number of the house
 *         phone: 
 *           type: number
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
 *     login:
 *       type: object
 *       required:
 *         - password
 *         - userName
 *       properties:
 *         userName:
 *           type: string
 *           description: User name account
 *         password:
 *           type: string
 *           description: Password account
 *       example:
 *          userName: test
 *          password: "1234"
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

 /**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user on the sistem
 *     tags: [User]
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Login was successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Petition was successfull
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: User token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVkZjQ2MDQwM2FiYzE0Y2Y2NDQwNDkiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjI2MjgyNjAzLCJleHAiOjE3MTI2ODI2MDN9.4WWvf4bHZUFPdmvbKBLsbbV4LqiyVQA7pUVepAsOq40
 *                 user:
 *                   type: object
 *                   description: User information
 *                   example:
 *                     "_id": "60edf460403abc14cf644049"
 *                     "userName": "test"
 *                     "fullName": "test"
 *                     "street": "test"
 *                     "number": 9,
 *                     "phone": "666666666"
 *                     "email": "test@gmail.com"
 *                     "password": "$2b$10$sx1fBflTgtKwEAWrFN9F8OHqp7PaYxuyGhzvzfJ4iKixoHu44CV7m"
 *                     "__v": 0
 *                 msg:
 *                   type: string
 *                   description: Informative message
 *                   example: "[SUCCESS] Login successfully..."
 *       400:
 *         description: Unexpected error when sign jwt.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Petition was successfull
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Informative message
 *                   example: "[ERROR] Unexpected error on jwt..."
 *       404:
 *         description: Password or UserName not match.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Petition was successfull
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Informative message
 *                   example: "[ERROR] Password doesnt match..."
 *       500:
 *         description: Comunication with the endpoint not working
 */

router.post('/login', userController.loginUser)
module.exports = router