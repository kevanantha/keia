const Product = require('../models/Product')
const deleteGcs = require('../helpers/deleteGcs')

module.exports = {
  async index(req, res, next) {
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  },
  async create(req, res, next) {
    try {
      let image
      if (req.file) {
        image = req.file.cloudStoragePublicUrl
      } else {
        image = req.body.image
      }
      const { name, price, stock, categories, description } = req.body
      const product = await Product.create({
        name,
        price,
        stock,
        categories,
        image,
        description
      })
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  },
  async show(req, res, next) {
    try {
      const product = await Product.findOne({
        _id: req.params.productId
      })
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      let image
      if (req.file) {
        image = req.file.cloudStoragePublicUrl
      } else {
        image = req.body.image
      }
      const { name, price, stock, categories, description } = req.body
      const updated = await Product.updateOne(
        {
          _id: req.params.productId
        },
        {
          name,
          price,
          stock,
          categories,
          image,
          description
        },
        { runValidators: true }
      )
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },
  async delete(req, res, next) {
    try {
      const product = await Product.findOne({
        _id: req.params.productId
      })
      deleteGcs(product.image)
      const deleted = await Product.deleteOne({
        _id: req.params.productId
      })
      res.status(200).json({ message: 'Product deleted successfully' })
    } catch (err) {
      next(err)
    }
  }
}
