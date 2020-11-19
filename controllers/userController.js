const { User, Cart, Product } = require('../models/index')
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


  static async getCartUser(req, res, next) {
    try {
      const id = +req.loggedInUser.id
      const cartUser = await Cart.findAll({
        where: { UserId: id },
        include: [
          {
            model: Product,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json({cartUser})
    } catch (error) {
      next(error)
    }
  }

  static async postCart(req, res, next) {
    try {
      const id = +req.loggedInUser.id
      const ProductId = +req.params.id

      let cartUser = await Cart.findOne({
        where: {
          UserId: id,
          ProductId
        },
        include: [
          {
            model: Product,
            attributes: {
              include: ['stock']
            }
          }
        ]
      })

      if (cartUser) {
        if (cartUser.Product.stock > cartUser.quatity) {
          await Cart.update({
            amount: cartUser.amount + 1
          }, {
              where: {
              UserId: id,
              ProductId
            }
          })
        }
      } else {
        cartUser = await Cart.create({
          UserId: id,
          ProductId,
          amount: 1
        })
      }
      res.status(200).json(cartUser)
    } catch (error) {
      next(error)
    }
  }

  static async updateQty(req, res, next) {
    try {
      const id = +req.loggedInUser.id
      const ProductId = +req.params.id
      const { amount } = req.body

      const product = await Product.findByPk(+ProductId)

      if (product.stock >= amount) {
        const cartUser = await Cart.update({
          amount
        }, {
            where: {
            UserId: id,
            ProductId
            },
          returning: true
        })
        res.status(200).json(cartUser[1][0])
      } else {
        next({
          status: 400,
          message: 'Product stock is out of limit'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const id = +req.loggedInUser.id
      const ProductId = req.params.id

      const cartItem = await Cart.destroy({
        where: {
          UserId: id,
          ProductId
        }
      })
      res.status(200).json({
        message: 'Successfully remove from cart!', cartItem
      })
    } catch (error) {
      next(error)
    }
  }

  static async checkoutCart(req, res, next) {
    try {
      const { cartUser } = req.body
      
      for ( let i = 0; i < cartUser.length; i++) {
        const item = cartUser[i]
        const stock = item.Product.stock - item.amount
        await Product.update({
          stock
        }, {
            where: {
            id: item.ProductId
          }
        })

        await Cart.destroy({
          where: {
            id: item.id
          }
        })
      }
      res.status(200).json({message: 'Checkout success thank you!'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
