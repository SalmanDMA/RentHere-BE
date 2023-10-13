const { Testimonials } = require('../models');

const calculateAverageRatingCar = async (carId) => {
  let testimonials;

  if (carId) {
    testimonials = await Testimonials.findAll({
      where: { carId },
    });
  }

  if (testimonials.length === 0) {
    return 0;
  }

  const totalRating = testimonials.reduce((acc, curr) => acc + curr.rating_car, 0);
  const averageRating = totalRating / testimonials.length;

  return averageRating;
};

const calculateAverageRatingBike = async (bikeId) => {
  let testimonials;

  if (bikeId) {
    testimonials = await Testimonials.findAll({
      where: { bikeId },
    });
  }

  if (testimonials.length === 0) {
    return 0;
  }

  const totalRating = testimonials.reduce((acc, curr) => acc + curr.rating_bike, 0);
  const averageRating = totalRating / testimonials.length;

  return averageRating;
};

module.exports = {
  calculateAverageRatingCar,
  calculateAverageRatingBike,
};
