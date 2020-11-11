const { User } = require('../models/')

async function authorization(req, res, next) {
  try {
    const { email } = req.loggedInUser

    const user = await User.findOne({ where: { email } })

    if (user.role === 'Admin') {
      next()
    } else
      next({
        status: 401,
        message: `Not Authorized`
      })
  } catch (error) {
    next(error)
  }
}

module.exports = authorization
