const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static async postRegister(req, res, next) {
    try {
      let { full_name, email, role, password } = req.body

      if (!role) {
        role = 'Customer'
      }

      let user = await User.create({ full_name, email, role, password })
      res
        .status(201)
        .json({ id: user.id, email: user.email, full_name: user.full_name })
    } catch (error) {
      next(error)
    }
  }

  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: {
          email,
        },
      })

      if (!user) {
        res.status(401).json({
          message: 'Username or password is wrong',
        })
      } else if (!comparePassword(password, user.password)) {
        res.status(401).json({
          message: 'Username or password is wrong',
        })
      } else {
        const userToken = generateToken({
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
        })
        res.status(200).json({
          access_token: userToken,
          full_name: user.full_name,
          email: user.email,
          role: user.role
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
