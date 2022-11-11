const multer  = require('multer');
const upload = multer({ dest: 'media/review-images' });

module.exports = upload;
