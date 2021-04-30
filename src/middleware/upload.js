const multer = require('multer')
const path = require('path')
const helper = require('../helpers/wrapper')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/upload')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const listExt = ['.jpg', '.png', '.jpeg']
  const ext = path.extname(file.originalname).toLowerCase()
  if (listExt.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Extension file must be jpg/png !'), false)
  }
}

// Tambahkan limit condition
// Berapa banyak file yang bisa diupload?
const upload = multer({ storage, fileFilter }).single('movieImage')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(res, 401, err.message, null)
    } else if (err) {
      return helper.response(res, 401, err.message, null)
    }
    next()
  })
}

module.exports = uploadFilter
