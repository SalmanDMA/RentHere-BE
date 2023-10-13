const jwt = require('jsonwebtoken');
const AuthenticationError = require('../exeptions/AuthenticationError');

exports.createAccessToken = async (id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_AGE,
  });
  return token;
};

exports.verifyAccessToken = async (token) => {
  const isValid = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!isValid) {
    throw new AuthenticationError('Invalid token');
  }
  return isValid;
};

exports.decodePayload = async (token) => {
  const payload = await jwt.decode(token, process.env.JWT_SECRET_KEY);
  return payload;
};
