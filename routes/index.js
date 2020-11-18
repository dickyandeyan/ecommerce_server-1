const router = require('express').Router()
const UserController = require('../controllers/userController')
const productRouter = require('./product')
const userRouter = require('./user')

router.use('/', productRouter)
router.use('/', userRouter)

module.exports = router
