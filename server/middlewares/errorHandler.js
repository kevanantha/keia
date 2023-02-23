module.exports = (err, req, res, next) => {
  let status
  let message
  console.log(err)

  switch (err.name) {
    case 'AuthenticationError':
      status = 401
      message = err.message
      break
    case 'ValidationError':
      status = 400
      const arr = []
      if (err.errors) {
        for (const key in err.errors) {
          arr.push(err.errors[key].message)
        }
      } else {
        arr.push(err.message)
      }
      message = arr
      break
    case 'JsonWebTokenError':
      status = 401
      message = 'Not Authenticated! You must login'
      break
    case 'Unauthorized':
      status = 403
      message = err.message
      break
    case 'NotFound':
      status = 404
      message = err.message
      break
    default:
      status = 500
      message = err.message || err.msg || 'Internal Server Error'
      break
  }

  res.status(status).json(message)
}
