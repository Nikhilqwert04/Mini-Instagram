import multer from "multer"

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage,limits:{
    fileSize: 5 * 1024 * 10241
} })

export  {storage,upload}