const express = require('express');

const { authCheck } = require('../middleware/authCheck');
const { payment } = require('../controllers/payment');

const router = express.Router();

router.post('/orders', authCheck, payment);
module.exports = router;
