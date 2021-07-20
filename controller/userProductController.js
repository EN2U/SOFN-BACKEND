const { AsyncWrapper } = require('../utils/async-wrapper')

const addProduct = AsyncWrapper(async (req, res) => {
  console.log('Add product')
  return res.status(200).send({
    success: true,
    msg: '[SUCCESS] Product added successfully...'
  })
})

const deleteProduct = AsyncWrapper(async (req, res) => {
  console.log('Deltete product')
  return res.status(200).send({
    success: true,
    msg: '[SUCCESS] Product deleted successfully...'
  })
})
const updateProduct = AsyncWrapper(async (req, res) => {
  console.log('Update product')
  return res.status(200).send({
    success: true,
    msg: '[SUCCESS] Product updated successfully...'
  })
})
const getProducts = AsyncWrapper(async (req, res) => {
  console.log('Get product')
  return res.status(200).send({
    success: true,
    msg: '[SUCCESS] Product retrieved successfully...'
  })
})
const searchProduct = AsyncWrapper(async (req, res) => {
  console.log('Add product')
  return res.status(200).send({
    success: true,
    msg: '[SUCCESS] Product found successfully...'
  })
})

const getAllProducts = AsyncWrapper(async (req, res) => {
  console.log('Add product')
  return res.status(200).send({
    success: true,
    msg: '[SUCCESS] Product found successfully...'
  })
})

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  searchProduct,
  getAllProducts
}
