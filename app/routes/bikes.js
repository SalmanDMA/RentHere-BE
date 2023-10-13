const express = require('express');
const { authCheck, adminCheck } = require('../middleware/authCheck');
const {
  findAll, findById, createNewBike, updateBikeHandler, deleteBikeHandler,
} = require('../controllers/bikes');

const router = express.Router();

router.get('/bikes', findAll);
router.get('/bikes/:id', authCheck, findById);
router.post('/bikes', authCheck, adminCheck, createNewBike);
router.put('/bikes/:id', authCheck, adminCheck, updateBikeHandler);
router.delete('/bikes/:id', authCheck, adminCheck, deleteBikeHandler);

module.exports = router;
