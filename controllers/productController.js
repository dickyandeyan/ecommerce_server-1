const { Product } = require('../models/index')

class ProductController {
  static async getProduct(req, res, next) {
    try {
      const product = await Product.findAll({
        order: [['id', 'DESC']]
      })
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async getProductById(req, res, next) {
    const id = +req.params.id

    try {
      const getProd = await Product.findByPk(id)
      res.status(200).json(getProd)
    } catch (error) {
      next(error)
    }
  }

  static async addProduct(req, res, next) {
    const userId = +req.loggedInUser.id
    try {
      let { name, image_url, price, stock } = req.body

      const newProduct = await Product.create({
        name,
        image_url,
        price,
        stock,
        userId
      })

      if (newProduct) {
        res.status(201).json({ message: 'New product added!', newProduct })
      } else {
        next({
          status: 500,
          message: `Error while adding product`
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const id = +req.params.id
      const { name, image_url, price, stock } = req.body

      const updated = await Product.update(
        {
          name,
          image_url,
          price,
          stock
        },
        { where: { id } }
      )

      if (updated[0] > 0) {
        res.status(200).json({ message: 'Product updated!'})
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = +req.params.id

      await Product.destroy({ where: { id } })

      res.status(200).json({ message: `Product deleted!` })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController
