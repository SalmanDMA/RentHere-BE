const asyncHandler = require('express-async-handler');
const {
  createBike, findAllBike, findBikeById, updateBike, deleteBike,
} = require('../services/bikes');

const createNewBike = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { role } = req.user;
  const bike = await createBike(req.body, role);
  res.status(201).json({
    status: 'success',
    message: 'Bike created',
    data: bike,
  });
});

const findAll = asyncHandler(async (req, res) => {
  const bikes = await findAllBike();
  res.status(200).json({
    status: 'success',
    message: 'List of all bikes',
    data: bikes,
  });
});

const findById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bike = await findBikeById(id);
  res.status(200).json({
    status: 'success',
    message: 'Bike found',
    data: bike,
  });
});

const updateBikeHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await updateBike(id, req.body, role);

  res.status(200).json({
    status: 'success',
    message: `Bike updated with id ${id}`,
  });
});

const deleteBikeHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await deleteBike(id, role);
  res.status(200).json({
    status: 'success',
    message: `Bike deleted with id ${id}`,
  });
});

module.exports = {
  createNewBike,
  findAll,
  findById,
  updateBikeHandler,
  deleteBikeHandler,
};
