const User = require('../models/User')

const isAdmin = (req, res, next) => {
  User.findOne({
    _id: req.user.id
  }).then(user => {
    console.log(user)
    if (user.isAdmin) {
      next()
    } else {
      const err = new Error("You don't have permission")
      err.name = 'Unauthorized'
      next(err)
    }
  })
}

module.exports = isAdmin
