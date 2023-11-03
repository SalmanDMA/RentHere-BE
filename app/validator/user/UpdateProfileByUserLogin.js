const { body, validationResult } = require('express-validator');
const InvariantError = require('../../exeptions/InvariantError');

exports.validateUpdateProfileUserByLogin = [
  body('name')
    .notEmpty()
    .withMessage('Name needs to be filled')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('address')
    .notEmpty()
    .withMessage('Address needs to be filled'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('PhoneNumber needs to be filled'),
  body('profilePicture')
    .notEmpty()
    .withMessage('ProfilePicture needs to be filled'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];
