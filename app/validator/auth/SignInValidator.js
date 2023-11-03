const { body, validationResult } = require('express-validator');
const InvariantError = require('../../exeptions/InvariantError');

exports.validateUserLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email needs to be filled')
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .notEmpty()
    .withMessage('Password needs to be filled'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },

];
