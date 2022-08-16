const productRouter = require('express').Router()
const ProductController = require('../controller/ProductController')

productRouter.get('/', ProductController.readAllProduct)
productRouter.post('/', ProductController.addProduct)
productRouter.put('/:productId', ProductController.updateProduct)
productRouter.get('/:productId', ProductController.showProduct)

module.exports = productRouter