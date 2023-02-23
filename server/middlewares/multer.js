const Multer = require('multer')

module.exports = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})
