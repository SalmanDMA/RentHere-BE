/* eslint-disable consistent-return */
const { body, validationResult } = require('express-validator');
const InvariantError = require('../../exeptions/InvariantError');

exports.validateUploadImage = [
  body('image')
    .notEmpty()
    .withMessage('Image needs to be filled'),

  (req, res, next) => {
    if (!req.files || !req.files.image) {
      return next();
    }

    const { image } = req.files;

    if (image.size > 1000000) {
      throw new InvariantError('Image size should not exceed 1 MB');
    }

    next();
  },
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];
