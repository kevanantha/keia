const { Schema, model } = require('mongoose')

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'userId is required']
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'productId is required']
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is required'],
      min: 1
    },
    totalPrice: {
      type: String,
      required: [true, 'totalPrice is required']
    }
  },
  { versionKey: false, timestamps: true }
)

const Cart = model('Cart', cartSchema)

module.exports = Cart
