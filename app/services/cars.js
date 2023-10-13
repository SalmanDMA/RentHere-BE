const AuthorizationError = require('../exeptions/AuthorizationError');
const InvariantError = require('../exeptions/InvariantError');
const NotFoundError = require('../exeptions/NotFoundError');
const { Cars } = require('../models');
const { calculateQtyCar } = require('../utils/calculateQty');
const { calculateAverageRatingCar } = require('../utils/calculateRating');

const findAllCar = async () => {
  const cars = await Cars.findAll();

  const carsWithRating = await Promise.all(cars.map(async (car) => {
    const averageRating = await calculateAverageRatingCar(car.id);
    return {
      ...car.dataValues,
      rating: averageRating,
    };
  }));

  const carsQty = await Promise.all(carsWithRating.map(async (car) => {
    const qty = await calculateQtyCar(car.id, car.quantity);
    console.log(qty);
    return {
      ...car,
      quantity: qty,
    };
  }));

  return carsQty;
};

const findCarById = async (id) => {
  const car = await Cars.findOne({ where: { id } });
  if (!car) {
    throw new NotFoundError(`Car dengan id '${id}' tidak ditemukan`);
  }

  const averageRating = await calculateAverageRatingCar(id);
  car.rating = averageRating;

  const qty = await calculateQtyCar(id, car.quantity);
  car.quantity = qty;

  return car;
};

const createCar = async (carData, userRole) => {
  const {
    name, brand, quantity, picture, price, description,
  } = carData;
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const existingCar = await Cars.findOne({ where: { name } });
  if (existingCar) {
    throw new InvariantError(`Car dengan nama '${name}' sudah terdaftar`);
  }

  const car = {
    name,
    brand,
    quantity,
    picture,
    price,
    description,
    rating: 0,
  };

  const newCar = await Cars.create(car);
  return newCar;
};

const updateCar = async (id, carData, userRole) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const car = await Cars.findOne({ where: { id } });
  if (!car) {
    throw new NotFoundError(`Car dengan id '${id}' tidak ditemukan`);
  }

  const {
    name, brand, quantity, picture, price, description,
  } = carData;

  if (name) car.name = name;
  if (brand) car.brand = brand;
  if (quantity) car.quantity = quantity;
  if (picture) car.picture = picture;
  if (price) car.price = price;
  if (description) car.description = description;
  const averageRating = await calculateAverageRatingCar(id);
  car.rating = averageRating;

  await car.save();
  return car;
};

const deleteCar = async (id, userRole) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const car = await Cars.findOne({ where: { id } });
  if (!car) {
    throw new NotFoundError(`Car dengan id '${id}' tidak ditemukan`);
  }

  await car.destroy();
  return car;
};

module.exports = {
  findAllCar,
  findCarById,
  createCar,
  updateCar,
  deleteCar,
};
