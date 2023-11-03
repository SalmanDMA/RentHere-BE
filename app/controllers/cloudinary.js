const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary');

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = asyncHandler(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto',
  });

  res.json({
    status: 'success',
    message: 'Image uploaded',
    data: result,
  });
});

const removeImage = asyncHandler(async (req, res) => {
  const imageId = req.body.public_id;

  cloudinary.uploader.destroy(imageId, (err, result) => {
    if (err) throw err;
    res.json({
      status: 'success',
      message: 'Image deleted',
      data: result,
    });
  });
});

module.exports = {
  uploadImage,
  removeImage,
};
