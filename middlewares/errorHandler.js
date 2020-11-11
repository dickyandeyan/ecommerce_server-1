module.exports = function (err, req, res, next) {
  console.log('Masuk Handler')
  console.log(err)
  let status = 500
  let message = err.name || 'Internal Server Error'
  if (err.name === 'SequelizeValidationError') {
    status = 400
    message = err.errors[0].message
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    message = err.errors[0].message
  }
  res.status(status).json({
    message
  })
}
