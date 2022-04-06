var multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

function fileFilter (req, file, cb) {
    if (file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else {
        cb(new Error('I don\'...jpg ok'))
    }
}

const  upload = multer({storage: storage,fileFilter:fileFilter, limits:{
        fileSize:1024 * 1024 *2 , //2mb
        files : 5
    } })

module.exports = upload