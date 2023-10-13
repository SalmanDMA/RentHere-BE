const express = require('express');

const router = express.Router();
const { userSignUp, userSignIn } = require('../controllers/auth');

router.post('/auth/signup', userSignUp);
router.post('/auth/signin', userSignIn);

module.exports = router;
