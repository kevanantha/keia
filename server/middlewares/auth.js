const { verifyToken } = require('../helpers/jwt')
const Cart = require('../models/Cart')

const authentication = (req, res, next) => {
  try {
    const decode = verifyToken(req.headers.access_token)
    req.user = decode
    next()
  } catch (err) {
    next(err)
  }
}

const authorizationCart = (req, res, next) => {
  Cart.findById(req.params.cartId)
    .then(cart => {
      console.log(cart)
      if (cart) {
        if (cart.userId == req.user.id) next()
        else {
          const err = new Error('Permission denied')
          err.name = 'Unauthorized'
          next(err)
        }
      } else {
        const err = new Error('Not Found')
        err.name = 'NotFound'
        next(err)
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = {
  authentication,
  authorizationCart
}
