const Cart = require('../models/Cart')

module.exports = {
  async findAllByUserId(req, res, next) {
    try {
      const carts = await Cart.find({ userId: req.user.id }).populate(['userId', 'productId'])
      res.status(200).json(carts)
    } catch (err) {
      next(err)
    }
  },
  async create(req, res, next) {
    try {
      const existingCart = await Cart.findOne({
        productId: req.body.productId,
        userId: req.user.id
      }).populate('productId')

      if (existingCart) {
        existingCart.quantity += req.body.quantity
        existingCart.totalPrice = existingCart.quantity * existingCart.productId.price
        return existingCart
          .save()
          .then(_ => res.status(201).json())
          .catch(err => next(err))
      } else {
        const { productId, quantity, totalPrice } = req.body
        const cart = await Cart.create({ productId, quantity, totalPrice, userId: req.user.id })
        res.status(201).json(cart)
      }
    } catch (err) {
      next(err)
    }
  },
  async delete(req, res, next) {
    try {
      const deleted = await Cart.deleteOne({
        _id: req.params.cartId
      })
      res.status(204).json()
    } catch (err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      const { productId, quantity, totalPrice } = req.body
      const updated = await Cart.updateOne(
        {
          _id: req.params.cartId
        },
        { productId, quantity, totalPrice, userId: req.user.id },
        { runValidators: true }
      )
      res.status(204).json(updated)
    } catch (err) {
      next(err)
    }
  },
  async updateQty(req, res, next) {
    try {
      const updated = await Cart.updateOne(
        {
          _id: req.params.cartId
        },
        {
          $set: {
            quantity: req.body.quantity,
            totalPrice: req.body.totalPrice
          }
        }
      )
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  }
}
