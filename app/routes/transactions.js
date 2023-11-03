const express = require('express');
const { authCheck, adminCheck } = require('../middleware/authCheck');
const {
  findAllByUser, findByIdByUser,
  updateTransactionByUserHandler,
  deleteTransactionByUserHandler,
  createNewTransaction,
  createNewTransactionByAdmin,
  findAllByAdmin, findByIdByAdmin, updateTransactionAdminHandler, deleteTransactionAdminHandler,
  findAllLenghtTransactions,
} = require('../controllers/transactions');
const { validateUpdateTransaction } = require('../validator/transaction/UpdateTransaction');
const { validateCreateTransaction } = require('../validator/transaction/CreateTransaction');

const router = express.Router();

// Lenght All Transaction
router.get('/transactions/length', findAllLenghtTransactions);

// Admin
router.get('/transactions/admin', authCheck, adminCheck, findAllByAdmin);
router.get('/transactions/admin/:id', authCheck, adminCheck, findByIdByAdmin);
router.put('/transactions/admin/:id', authCheck, adminCheck, validateUpdateTransaction, updateTransactionAdminHandler);
router.delete('/transactions/admin/:id', authCheck, adminCheck, deleteTransactionAdminHandler);
router.post('/transactions/admin', authCheck, adminCheck, validateCreateTransaction, createNewTransactionByAdmin);

// User
router.get('/transactions', authCheck, findAllByUser);
router.get('/transactions/:id', authCheck, findByIdByUser);
router.put('/transactions/:id', authCheck, validateUpdateTransaction, updateTransactionByUserHandler);
router.delete('/transactions/:id', authCheck, deleteTransactionByUserHandler);
router.post('/transactions', authCheck, validateCreateTransaction, createNewTransaction);

module.exports = router;
