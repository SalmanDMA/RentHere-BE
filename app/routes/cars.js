const express = require('express');
const {
  findAll, findById, updateCarHandler, deleteCarHandler, createNewCar,
} = require('../controllers/cars');
const { authCheck, adminCheck } = require('../middleware/authCheck');
const { validateNewVehicle } = require('../validator/vehicle/CreateVehicle');
const { validateUpdateVehicle } = require('../validator/vehicle/UpdateVehicle');

const router = express.Router();

router.get('/cars', findAll);
router.get('/cars/:id', authCheck, findById);
router.post('/cars', authCheck, adminCheck, validateNewVehicle, createNewCar);
router.put('/cars/:id', authCheck, adminCheck, validateUpdateVehicle, updateCarHandler);
router.delete('/cars/:id', authCheck, adminCheck, deleteCarHandler);

module.exports = router;
