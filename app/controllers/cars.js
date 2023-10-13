const asyncHandler = require('express-async-handler');
const {
  createCar, findAllCar, findCarById, updateCar, deleteCar,
} = require('../services/cars');

const createNewCar = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { role } = req.user;
  const car = await createCar(req.body, role);
  res.status(201).json({
    status: 'success',
    message: 'Car created',
    data: car,
  });
});

const findAll = asyncHandler(async (req, res) => {
  const cars = await findAllCar();
  res.status(200).json({
    status: 'success',
    message: 'List of all cars',
    data: cars,
  });
});

const findById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const car = await findCarById(id);
  res.status(200).json({
    status: 'success',
    message: 'Car found',
    data: car,
  });
});

const updateCarHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await updateCar(id, req.body, role);

  res.status(200).json({
    status: 'success',
    message: `Car updated with id ${id}`,
  });
});

const deleteCarHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await deleteCar(id, role);
  res.status(200).json({
    status: 'success',
    message: `Car deleted with id ${id}`,
  });
});

module.exports = {
  createNewCar,
  findAll,
  findById,
  updateCarHandler,
  deleteCarHandler,
};
