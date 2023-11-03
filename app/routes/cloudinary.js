const express = require('express');

const { authCheck } = require('../middleware/authCheck');
const { uploadImage, removeImage } = require('../controllers/cloudinary');
const { validateUploadImage } = require('../validator/cloudinary/UploadImage');

const router = express.Router();

router.post('/upload/images', authCheck, validateUploadImage, uploadImage);
router.post('/removeimages', authCheck, removeImage);
module.exports = router;
