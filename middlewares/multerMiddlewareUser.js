const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images/users'),
    filename: (req, file, cb) => {
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;