const { AsyncWrapper } = require('../utils/async-wrapper')

const ProductCategories = require('../models/ProductCategories')
const ErrorRequest = require('../errorHandling/requestError')
const _ = require('lodash')

const initializeCategories = AsyncWrapper(async (req, res) => {
  try {
    const x = await ProductCategories.insertMany([
      { name: 'lacteos' },
      { name: 'Frutas y verduras' },
      { name: 'legumbres' },
      { name: 'Tubérculos' },
      { name: 'Frutos secos' },
      { name: 'Carne, pescado y huevos' },
      { name: 'Aceites, grasas y mantequillas' }])
    if (!x) throw new ErrorRequest('[ERROR] Something unexpected ocurred ', 400)
    return res.status(200).send({
      status: true,
      msg: 'all saved'
    })
  } catch (error) {
    return res.status(400).send({
      status: false,
      msg: error
    })
  }
})

const getCategories = AsyncWrapper(async (req, res) => {
  try {
    const data = await ProductCategories.find()
    return res.status(200).send({
      status: true,
      msg: 'All returned',
      data: data
    })
  } catch (error) {
    return res.status(400).send({
      status: false,
      msg: error
    })
  }
})

module.exports = {
  initializeCategories,
  getCategories
}
