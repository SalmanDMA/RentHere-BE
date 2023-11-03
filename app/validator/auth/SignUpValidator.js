const { body, validationResult } = require('express-validator');
const InvariantError = require('../../exeptions/InvariantError');

exports.validateUserRegister = [
  body('name')
    .notEmpty()
    .withMessage('Name needs to be filled')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email needs to be filled')
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .notEmpty()
    .withMessage('Password needs to be filled')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'i')
    .withMessage('Password must contain at least 1 letter, 1 number, and 1 special character'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];
