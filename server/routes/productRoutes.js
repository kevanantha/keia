const router = require('express').Router()
const { ProductController } = require('../controllers')
const { authentication } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', ProductController.index)
router.get('/:productId', ProductController.show)
router.use(authentication)
router.post('/create', isAdmin, multer.single('image'), gcs, ProductController.create)
router.put('/:productId/update', isAdmin, multer.single('image'), gcs, ProductController.update)
router.delete('/:productId/delete', isAdmin, ProductController.delete)

module.exports = router
