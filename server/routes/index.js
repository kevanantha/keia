const router = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome' })
})
router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/carts', cartRoutes)

module.exports = router
