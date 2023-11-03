const { body, validationResult } = require('express-validator');
const InvariantError = require('../../exeptions/InvariantError');

exports.validateNewVehicle = [
  body('name')
    .notEmpty()
    .withMessage('Name needs to be filled')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('brand')
    .notEmpty()
    .withMessage('Name needs to be filled')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity needs to be filled')
    .isNumeric()
    .withMessage('Quantity must be a number'),
  body('price')
    .notEmpty()
    .withMessage('Price needs to be filled')
    .isNumeric()
    .withMessage('Price must be a number'),
  body('description')
    .notEmpty()
    .withMessage('Description needs to be filled')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be at least 10 characters and at most 2000 characters'),
  body('picture')
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
