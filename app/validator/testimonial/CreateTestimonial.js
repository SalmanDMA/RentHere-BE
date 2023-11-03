/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const { body, validationResult } = require('express-validator');
const InvariantError = require('../../exeptions/InvariantError');

exports.validateCreateTestimonial = [
  // body('userId')
  //   .notEmpty()
  //   .withMessage('User ID needs to be filled'),
  // body('carId')
  //   .optional()
  //   .isInt()
  //   .withMessage('Car ID must be an integer'),
  // body('bikeId')
  //   .optional()
  //   .isInt()
  //   .withMessage('Bike ID must be an integer'),
  // body('rating_bike')
  //   .optional()
  //   .isInt()
  //   .withMessage('Rating for bike must be number'),
  // body('rating_car')
  //   .optional()
  //   .isInt()
  //   .withMessage('Rating for car must be number'),
  // body('carTestimonial')
  //   .optional()
  //   .isString()
  //   .isLength({ min: 10, max: 100 })
  //   .withMessage('Car testimonial must be at least 10 characters long and max 100 characters long'),
  // body('bikeTestimonial')
  //   .optional()
  //   .isString()
  //   .isLength({ min: 10, max: 100 })
  //   .withMessage('Car testimonial must be at least 10 characters long and max 100 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];
