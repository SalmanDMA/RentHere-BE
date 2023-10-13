/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const AuthorizationError = require('../exeptions/AuthorizationError');
const InvariantError = require('../exeptions/InvariantError');
const NotFoundError = require('../exeptions/NotFoundError');
const {
  Testimonials, Cars, Bikes, Users,
} = require('../models');

const createTestimonialUser = async (userId, data) => {
  const carId = data.carId ? data.carId : null;

  const bikeId = data.bikeId ? data.bikeId : null;

  const existingTestimonial = await Testimonials.findOne({
    where: {
      userId,
      carId: data.carId,
      bikeId: data.bikeId,
    },
  });

  if (existingTestimonial) {
    if (existingTestimonial.carId === data.carId) {
      throw new InvariantError(`Testimonial with car id ${data.carId} already exists`);
    } else if (existingTestimonial.bikeId === data.bikeId) {
      throw new InvariantError(`Testimonial with bike id ${data.bikeId} already exists`);
    }
  }

  const {
    testimonial, ratingBike, ratingCar,
  } = data;

  const testimonialData = {
    userId,
    carId,
    bikeId,
    testimonial,
    rating_bike: ratingBike,
    rating_car: ratingCar,
  };

  const newtestimonial = await Testimonials.create(testimonialData);
  return newtestimonial;
};

const createTestimonialAdmin = async (userRole, data) => {
  const carId = data.carId ? data.carId : null;

  const bikeId = data.bikeId ? data.bikeId : null;

  console.log(data, 'data testi');
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const {
    testimonial, ratingBike, ratingCar, userId,
  } = data;

  const testimonialData = {
    userId,
    carId,
    bikeId,
    testimonial,
    rating_bike: ratingBike,
    rating_car: ratingCar,
  };

  const newtestimonial = await Testimonials.create(testimonialData);
  return newtestimonial;
};

const findAllTestimonials = async () => {
  const testimonials = await Testimonials.findAll();
  const testimonialsWithCarsAndBikes = [];

  for (const testimonial of testimonials) {
    const testimonialData = testimonial.dataValues;
    const { carId } = testimonialData;
    const { bikeId } = testimonialData;
    const { userId } = testimonialData;

    // Hanya mengambil data mobil jika carId tidak null
    if (carId !== null) {
      const car = await Cars.findOne({
        where: {
          id: carId,
        },
      });

      testimonialData.car = car ? { ...car.dataValues } : null;
    }

    // Hanya mengambil data sepeda jika bikeId tidak null
    if (bikeId !== null) {
      const bike = await Bikes.findOne({
        where: {
          id: bikeId,
        },
      });

      testimonialData.bike = bike ? { ...bike.dataValues } : null;
    }

    // Mengambil data user
    if (userId !== null) {
      const user = await Users.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ['password'],
        },
      });

      testimonialData.user = user ? { ...user.dataValues } : null;
    }

    testimonialsWithCarsAndBikes.push(testimonialData);
  }

  return testimonialsWithCarsAndBikes;
};

const findByIdTestimonial = async (id, userRole) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }
  const testimonial = await Testimonials.findOne({
    where: { id },
  });

  const testimonialData = testimonial.dataValues;
  const { carId } = testimonialData;
  const { bikeId } = testimonialData;
  const { userId } = testimonialData;

  // Hanya mengambil data mobil jika carId tidak null
  if (carId !== null) {
    const car = await Cars.findOne({
      where: {
        id: carId,
      },
    });

    testimonialData.car = car ? { ...car.dataValues } : null;
  }

  // Hanya mengambil data sepeda jika bikeId tidak null
  if (bikeId !== null) {
    const bike = await Bikes.findOne({
      where: {
        id: bikeId,
      },
    });

    testimonialData.bike = bike ? { ...bike.dataValues } : null;
  }

  // Mengambil data user
  if (userId !== null) {
    const user = await Users.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    testimonialData.user = user ? { ...user.dataValues } : null;
  }

  return testimonialData;
};

const updateTestimonial = async (id, userRole, data) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const existingTestimonial = await Testimonials.findOne({
    where: {
      id,
    },
  });

  if (!existingTestimonial) {
    throw new NotFoundError(`Testimonial dengan id '${id}' tidak ditemukan`);
  }

  const {
    testimonial, ratingBike, ratingCar, carId, bikeId,
  } = data;

  if (testimonial) {
    existingTestimonial.testimonial = testimonial;
  }

  if (ratingBike) {
    existingTestimonial.rating_bike = ratingBike;
  }

  if (ratingCar) {
    existingTestimonial.rating_car = ratingCar;
  }

  if (carId) {
    existingTestimonial.carId = carId;
  }

  if (bikeId) {
    existingTestimonial.bikeId = bikeId;
  }

  await existingTestimonial.save();
  return existingTestimonial;
};

const deleteTestimonial = async (id, userRole) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const existingTestimonial = await Testimonials.findOne({
    where: {
      id,
    },
  });

  if (!existingTestimonial) {
    throw new NotFoundError(`Testimonial dengan id '${id}' tidak ditemukan`);
  }

  await existingTestimonial.destroy();
  return existingTestimonial;
};

module.exports = {
  createTestimonialUser,
  createTestimonialAdmin,
  findAllTestimonials,
  findByIdTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
