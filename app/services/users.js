const bcrypt = require('bcryptjs');
const AuthorizationError = require('../exeptions/AuthorizationError');
const NotFoundError = require('../exeptions/NotFoundError');
const InvariantError = require('../exeptions/InvariantError');
const { Users } = require('../models');

const findLenghtUsers = async () => {
  const users = await Users.findAll();
  return users.length;
};

const findAllUser = async (userRole) => {
  if (userRole === 'ADMIN') {
    const users = await Users.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return users;
  }
  throw new AuthorizationError('You must be an admin, not a user');
};

const findUserById = async (id) => {
  const user = await Users.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) {
    throw new NotFoundError(`User dengan id '${id}' tidak ditemukan`);
  }
  return user;
};

const findUserByEmail = async (email) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError(`User dengan email '${email}' tidak ditemukan`);
  }
  return user;
};

const updateNewPasswordByUser = async ({ email, newPassword, currentPassword }) => {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    throw new InvariantError(`User '${email}' not found`);
  }

  const isPasswordMatch = await bcrypt.compare(currentPassword, existingUser.password);

  if (!isPasswordMatch) {
    throw new InvariantError('Old password does not match');
  }

  existingUser.password = await bcrypt.hash(newPassword, 10);

  await existingUser.save();
  return existingUser;
};

const createUser = async ({
  name, email, password, role, address, phoneNumber, profilePicture,
}) => {
  const existingUser = await Users.findOne({ where: { email } });

  if (existingUser !== null) {
    throw new InvariantError(`Email '${email}' sudah terdaftar`);
  }

  const userRole = role || 'USER';

  const user = {
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: userRole,
    address,
    phoneNumber,
    profilePicture,
  };

  console.log(user, 'user');

  const newUser = await Users.create(user);
  return newUser;
};

const updateUser = async (id, user, userRole) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }
  const existingUser = await Users.findOne({ where: { id } });
  if (!existingUser) {
    throw new NotFoundError(`User dengan id '${id}' tidak ditemukan`);
  }

  await existingUser.update(user);
  return existingUser;
};

const updateUserProfile = async (id, userData) => {
  const existingUser = await Users.findOne({ where: { id } });
  if (!existingUser) {
    throw new NotFoundError(`User dengan id '${id}' tidak ditemukan`);
  }
  if (userData.name) {
    existingUser.name = userData.name;
  }
  if (userData.phoneNumber) {
    existingUser.phoneNumber = userData.phoneNumber;
  }
  if (userData.address) {
    existingUser.address = userData.address;
  }
  if (userData.profilePicture) {
    existingUser.profilePicture = userData.profilePicture;
  }
  if (userData.coverPicture) {
    existingUser.coverPicture = userData.coverPicture;
  }
  await existingUser.save();
  return existingUser;
};

const deleteUser = async (id, userRole) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }
  const existingUser = await Users.findOne({ where: { id } });
  if (!existingUser) {
    throw new NotFoundError(`User dengan id '${id}' tidak ditemukan`);
  }
  await existingUser.destroy();
  return existingUser;
};

const deleteUserByUser = async (id) => {
  const existingUser = await Users.findOne({ where: { id } });
  if (!existingUser) {
    throw new NotFoundError(`User with id '${id}' not found`);
  }
  if (existingUser.role === 'ADMIN') {
    throw new InvariantError("You can't delete this user");
  }
  await existingUser.destroy();
  return existingUser;
};

module.exports = {
  findLenghtUsers,
  findAllUser,
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  updateUserProfile,
  updateNewPasswordByUser,
  deleteUser,
  deleteUserByUser,
};
