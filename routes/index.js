const router = require('express').Router()
const UserController = require('../controllers/userController')
const productRouter = require('./product')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.postRegister)
router.post('/login', UserController.postLogin)

router.use(authentication)

router.use('/', productRouter)

module.exports = router
