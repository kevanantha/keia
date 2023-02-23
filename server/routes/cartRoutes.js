const router = require('express').Router()
const { CartController } = require('../controllers')
const { authentication, authorizationCart } = require('../middlewares/auth')

router.use(authentication)
router.post('/create', CartController.create)
router.get('/', CartController.findAllByUserId)
router.patch('/:cartId/updateQty', authorizationCart, CartController.updateQty)
router.delete('/:cartId/delete', authorizationCart, CartController.delete)

module.exports = router
