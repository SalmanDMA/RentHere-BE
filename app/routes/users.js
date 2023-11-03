const express = require('express');
const { authCheck, adminCheck } = require('../middleware/authCheck');
const {
  findAll,
  findById,
  findByEmail,
  createNewUser,
  updateUserHandler,
  updateUserProfileHandler,
  deleteUserHandler,
  getUserProfile,
  findAllLenghtUsers,
  updateNewPasswordByUserHandler,
  deleteUserByUserHandler,
} = require('../controllers/users');
const { validateUpdateProfileUserByLogin } = require('../validator/user/UpdateProfileByUserLogin');
const { validateUpdatePasswordUser } = require('../validator/user/UpdatePassword');
const { validateUpdateUserByAdmin } = require('../validator/user/UpdateUserByAdmin');
const { validateNewUser } = require('../validator/user/CreateUser');

const router = express.Router();

router.get('/users/length', findAllLenghtUsers);
router.get('/users', authCheck, adminCheck, findAll);
router.get('/users/:id', authCheck, adminCheck, findById);
router.get('/me', authCheck, getUserProfile);
router.put('/me', authCheck, validateUpdateProfileUserByLogin, updateUserProfileHandler);
router.put('/users/password', authCheck, validateUpdatePasswordUser, updateNewPasswordByUserHandler);
router.put('/users/:id', authCheck, adminCheck, validateUpdateUserByAdmin, updateUserHandler);
router.post('/users', authCheck, adminCheck, validateNewUser, createNewUser);
router.delete('/users/delete', authCheck, deleteUserByUserHandler);
router.delete('/users/:id', authCheck, adminCheck, deleteUserHandler);
router.get('/users/email', findByEmail);

module.exports = router;
