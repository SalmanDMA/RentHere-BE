const asyncHandler = require('express-async-handler');
const { createUser } = require('../services/users');
const { signIn } = require('../services/auth');
const { createAccessToken } = require('../tokenize/tokenManager');

const userSignUp = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await createUser(req.body);
  res.status(201).json({
    status: 'success',
    message: 'User created',
    data: user,
  });
});

const userSignIn = asyncHandler(async (req, res) => {
  const { id, name, role } = await signIn(req.body);
  const accessToken = await createAccessToken(id, role);

  res.status(200).json({
    status: 'success',
    message: 'User signed in',
    data: {
      name,
      accessToken,
    },
  });
});

module.exports = {
  userSignUp,
  userSignIn,
};
