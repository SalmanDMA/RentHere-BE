const AuthorizationError = require('../exeptions/AuthorizationError');
const InvariantError = require('../exeptions/InvariantError');
const NotFoundError = require('../exeptions/NotFoundError');
const { Bikes } = require('../models');
const { calculateQtyBike } = require('../utils/calculateQty');
const { calculateAverageRatingBike } = require('../utils/calculateRating');

const findAllBike = async () => {
  const bikes = await Bikes.findAll();

  const BikesWithRating = await Promise.all(bikes.map(async (bike) => {
    const averageRating = await calculateAverageRatingBike(bike.id);
    return {
      ...bike.dataValues,
      rating: averageRating,
    };
  }));

  const bikesQty = await Promise.all(BikesWithRating.map(async (bike) => {
    const qty = await calculateQtyBike(bike.id, bike.quantity);
    console.log(qty);
    return {
      ...bike,
      quantity: qty,
    };
  }));

  return bikesQty;
};

const findBikeById = async (id) => {
  const bike = await Bikes.findOne({ where: { id } });
  if (!bike) {
    throw new NotFoundError(`Bike dengan id '${id}' tidak ditemukan`);
  }

  const averageRating = await calculateAverageRatingBike(id);
  bike.rating = averageRating;

  const qty = await calculateQtyBike(id, bike.quantity);
  bike.quantity = qty;

  return bike;
};

const createBike = async (bikeData, userRole) => {
  const {
    name, brand, quantity, picture, price, description,
  } = bikeData;
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const existingCar = await Bikes.findOne({ where: { name } });
  if (existingCar) {
    throw new InvariantError(`Bike dengan nama '${name}' sudah terdaftar`);
  }

  const bike = {
    name,
    brand,
    quantity,
    picture,
    price,
    description,
    rating: 0,
  };

  const newBike = await Bikes.create(bike);
  return newBike;
};

const updateBike = async (id, bikeData, userRole) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const bike = await Bikes.findOne({ where: { id } });
  if (!bike) {
    throw new NotFoundError(`Bike dengan id '${id}' tidak ditemukan`);
  }

  const {
    name, brand, quantity, picture, price, description,
  } = bikeData;

  if (name) bike.name = name;
  if (brand) bike.brand = brand;
  if (quantity) bike.quantity = quantity;
  if (picture) bike.picture = picture;
  if (price) bike.price = price;
  if (description) bike.description = description;
  const averageRating = await calculateAverageRatingBike(id);
  bike.rating = averageRating;
  bike.rating = averageRating;

  await bike.save();
  return bike;
};

const deleteBike = async (id, userRole) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const bike = await Bikes.findOne({ where: { id } });
  if (!bike) {
    throw new NotFoundError(`Bike dengan id '${id}' tidak ditemukan`);
  }

  await bike.destroy();
  return bike;
};

module.exports = {
  findAllBike,
  findBikeById,
  createBike,
  updateBike,
  deleteBike,
};
