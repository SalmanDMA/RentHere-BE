const bcrypt = require('bcryptjs');
const AuthenticationError = require('../exeptions/AuthenticationError');
const { Users } = require('../models');

const signIn = async ({ email, password }) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    throw new AuthenticationError('Invalid email, User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid password, wrong password');
  }

  return user;
};

module.exports = {
  signIn,
};
