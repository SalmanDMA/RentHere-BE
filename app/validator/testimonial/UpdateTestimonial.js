/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const { body, validationResult } = require('express-validator');
const InvariantError = require('../../exeptions/InvariantError');

exports.validateUpdateTestimonial = [
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
  // body('ratingBike')
  //   .optional()
  //   .isInt()
  //   .withMessage('Rating for bike must be number'),
  // body('ratingCar')
  //   .optional()
  //   .isInt()
  //   .withMessage('Rating for car must be number'),
  // body('carId')
  //   .optional()
  //   .isInt()
  //   .withMessage('Car ID must be an number'),
  // body('bikeId')
  //   .optional()
  //   .isInt()
  //   .withMessage('Bike ID must be an number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];
