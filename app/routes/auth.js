const express = require('express');

const router = express.Router();
const { userSignUp, userSignIn } = require('../controllers/auth');
const { validateUserRegister } = require('../validator/auth/SignUpValidator');
const { validateUserLogin } = require('../validator/auth/SignInValidator');

router.post('/auth/signup', validateUserRegister, userSignUp);
router.post('/auth/signin', validateUserLogin, userSignIn);

module.exports = router;
