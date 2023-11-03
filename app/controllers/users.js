const asyncHandler = require('express-async-handler');
const {
  createUser,
  findAllUser,
  findUserById,
  findUserByEmail,
  updateUser,
  updateUserProfile,
  deleteUser,
  findLenghtUsers, updateNewPasswordByUser, deleteUserByUser,
} = require('../services/users');
const AuthenticationError = require('../exeptions/AuthenticationError');

const findAllLenghtUsers = asyncHandler(async (req, res) => {
  const users = await findLenghtUsers();
  res.status(200).json({
    status: 'success',
    message: 'List of all users',
    data: users,
  });
});

const createNewUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await createUser(req.body);
  res.status(201).json({
    status: 'success',
    message: 'User created',
    data: user,
  });
});

const findAll = asyncHandler(async (req, res) => {
  const { role } = req.user;
  if (role !== 'ADMIN') {
    throw new AuthenticationError('You must be an admin, not a user');
  }
  const users = await findAllUser(role);
  res.status(200).json({
    status: 'success',
    message: 'List of all users',
    data: users,
  });
});

const findById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  res.status(200).json({
    status: 'success',
    message: 'User found',
    data: user,
  });
});

const findByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  res.status(200).json({
    status: 'success',
    message: 'User found',
    data:
      user,
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.id);
  console.log(user, 'suser');

  res.status(200).json({
    status: 'success',
    message: 'User profile found',
    data:
      user,
  });
});

const updateUserHandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const { role: userRole } = req.user;
  const {
    name, email, role, address, phoneNumber, profilePicture,
  } = req.body;
  const user = await findUserById(userId);
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  if (role) {
    user.role = role;
  }
  if (address) {
    user.address = address;
  }
  if (phoneNumber) {
    user.phoneNumber = phoneNumber;
  }
  if (profilePicture) {
    user.profilePicture = profilePicture;
  }
  await user.save();
  await updateUser(userId, user, userRole);

  res.status(200).json({
    status: 'success',
    message: 'User updated',
    data:
      user,
  });
});

const updateUserProfileHandler = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const {
    name, address, phoneNumber, profilePicture, coverPicture,
  } = req.body;
  await updateUserProfile(id, {
    name,
    address,
    phoneNumber,
    profilePicture,
    coverPicture,
  });
  res.status(200).json({
    status: 'success',
    message: 'User profile updated',
  });
});

const updateNewPasswordByUserHandler = asyncHandler(async (req, res) => {
  await updateNewPasswordByUser(req.body);
  res.status(200).json({
    status: 'success',
    message: 'Password has been Updated',
  });
});

const deleteUserHandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const { role } = req.user;
  await deleteUser(userId, role);
  res.status(200).json({
    status: 'success',
    message: `User deleted successfully with id : ${userId}`,
  });
});

const deleteUserByUserHandler = asyncHandler(async (req, res) => {
  const { id } = req.user;
  await deleteUserByUser(id);
  res.status(200).json({
    status: 'success',
    message: `User deleted successfully with id : ${id}`,
  });
});

module.exports = {
  findAllLenghtUsers,
  createNewUser,
  findAll,
  findById,
  findByEmail,
  getUserProfile,
  updateUserHandler,
  updateUserProfileHandler,
  updateNewPasswordByUserHandler,
  deleteUserHandler,
  deleteUserByUserHandler,
};
