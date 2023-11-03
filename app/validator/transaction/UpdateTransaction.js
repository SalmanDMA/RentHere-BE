const { body, validationResult } = require('express-validator');
const InvariantError = require('../../exeptions/InvariantError');

exports.validateUpdateTransaction = [
  // body('carId')
  //   .optional()
  //   .isNumeric()
  //   .withMessage('Car ID must be a number'),
  // body('bikeId')
  //   .optional()
  //   .isNumeric()
  //   .withMessage('Bike ID must be a number'),
  // body('startDate')
  //   .isISO8601()
  //   .withMessage('Start date must be in ISO8601 format (e.g., "YYYY-MM-DDTHH:mm:ss.sssZ")'),
  // body('totalCar')
  //   .optional()
  //   .isNumeric({ min: 1 })
  //   .withMessage('Total car must be at least 1'),
  // body('totalBike')
  //   .optional()
  //   .isNumeric({ min: 1 })
  //   .withMessage('Total bike must be at least 1'),
  // body('payment')
  //   .isFloat({ min: 0 })
  //   .withMessage('Payment must be a non-negative number'),
  body('rentalDuration')
    .isNumeric({ min: 1 })
    .withMessage('Rental duration must be at least 1 day'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];
