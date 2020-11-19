const router = require('express').Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.postRegister)
router.post('/login', UserController.postLogin)
router.post('/checkout', UserController.checkoutCart)

router.use(authentication)
router.get('/cart', UserController.getCartUser)
router.post('/cart/:id', UserController.postCart)
router.patch('/cart/:id', UserController.updateQty)
router.delete('/cart/:id', UserController.deleteCart)


module.exports = router