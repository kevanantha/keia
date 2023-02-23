const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    price: {
      type: String,
      required: [true, 'Price is required']
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Minimal stock is 0']
    },
    categories: [
      {
        type: String
      }
    ],
    image: {
      type: String,
      required: [true, 'Image is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    }
  },
  { versionKey: false, timestamps: true }
)

const Product = model('Product', productSchema)

module.exports = Product
