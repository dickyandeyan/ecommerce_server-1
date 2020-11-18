const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.get('/product', ProductController.getProduct)
router.get('/product/:id', authentication, ProductController.getProductById)
router.post('/product', authentication, authorization, ProductController.addProduct)
router.put('/product/:id', authentication, authorization, ProductController.updateProduct)
router.delete('/product/:id',authentication, authorization, ProductController.deleteProduct)

module.exports = router
