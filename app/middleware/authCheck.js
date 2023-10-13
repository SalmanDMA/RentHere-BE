const asynchandler = require('express-async-handler');
const AuthenticationError = require('../exeptions/AuthenticationError');
const { verifyAccessToken, decodePayload } = require('../tokenize/tokenManager');
const NotFoundError = require('../exeptions/NotFoundError');
const { Users } = require('../models');

exports.authCheck = asynchandler(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    throw new AuthenticationError('Not authenticated, no token provided');
  }
  await verifyAccessToken(token);
  const decode = await decodePayload(token);
  if (!decode) {
    throw new AuthenticationError('Invalid token');
  }

  const user = await Users.findOne({
    where: {
      id: decode.id,
    },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!user) {
    throw new NotFoundError(`User dengan id '${decode.id}' tidak ditemukan`);
  }

  req.user = user;
  next();
});

exports.adminCheck = asynchandler(async (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    throw new AuthenticationError('You must be an admin, not a user');
  }
  next();
});
