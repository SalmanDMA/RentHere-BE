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
} = require('../controllers/users');

const router = express.Router();

router.get('/users/length', findAllLenghtUsers);
router.get('/users', authCheck, adminCheck, findAll);
router.get('/users/email/:email', findByEmail);
router.get('/users/:id', authCheck, adminCheck, findById);
router.get('/me', authCheck, getUserProfile);
router.put('/me', authCheck, updateUserProfileHandler);
router.put('/users/:id', authCheck, adminCheck, updateUserHandler);
router.post('/users', authCheck, adminCheck, createNewUser);
router.delete('/users/:id', authCheck, adminCheck, deleteUserHandler);

module.exports = router;
