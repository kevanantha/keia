const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

module.exports = {
  async login(req, res, next) {
    try {
      const user = await User.findOne({
        email: req.body.email
      })
      if (user && comparePassword(req.body.password, user.password)) {
        const token = generateToken({
          id: user._id,
          email: user.email,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address
        })
        res.status(200).json({ token, id: user._id })
      } else {
        const err = new Error('Invalid email/password')
        err.name = 'AuthenticationError'
        next(err)
      }
    } catch (err) {
      next(err)
    }
  },
  async register(req, res, next) {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
      })
      const token = generateToken({
        id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address
      })
      res.status(201).json({ token })
    } catch (err) {
      next(err)
    }
  },
  async findOne(req, res, next) {
    try {
      const user = await User.findById(req.params.userId)
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }
}
