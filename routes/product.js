const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authorization = require('../middlewares/authorization')

router.get('/product', ProductController.getProduct)
router.get('/product/:id', ProductController.getProductById)
router.post('/product', authorization, ProductController.addProduct)
router.put('/product/:id', authorization, ProductController.updateProduct)
router.delete('/product/:id', authorization, ProductController.deleteProduct)

module.exports = router
