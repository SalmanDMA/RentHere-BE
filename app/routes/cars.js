const express = require('express');
const {
  findAll, findById, updateCarHandler, deleteCarHandler, createNewCar,
} = require('../controllers/cars');
const { authCheck, adminCheck } = require('../middleware/authCheck');

const router = express.Router();

router.get('/cars', findAll);
router.get('/cars/:id', authCheck, findById);
router.post('/cars', authCheck, adminCheck, createNewCar);
router.put('/cars/:id', authCheck, adminCheck, updateCarHandler);
router.delete('/cars/:id', authCheck, adminCheck, deleteCarHandler);

module.exports = router;
