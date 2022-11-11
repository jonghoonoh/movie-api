const multer  = require('multer');
const upload = multer({ dest: '../public/review-images' });

module.exports = upload;
