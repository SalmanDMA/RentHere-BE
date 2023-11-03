const asyncHandler = require('express-async-handler');
const {
  createTransaction, findAllTransactions,
  updateTransactionByAdmin,
  deleteTransactionByAdmin,
  findTransactionByIdWithAdmin, findTransactionById,
  updateTransaction,
  deleteTransaction,
  findAllTransactionsUser, createTransactionByAdmin, findLenghtTransaction,
} = require('../services/transactions');

const findAllLenghtTransactions = asyncHandler(async (req, res) => {
  const transactions = await findLenghtTransaction();
  res.status(200).json({
    status: 'success',
    message: 'List of all transactions',
    data: transactions,
  });
});

const createNewTransactionByAdmin = asyncHandler(async (req, res) => {
  const { role } = req.user;
  const transaction = await createTransactionByAdmin(role, req.body);

  res.status(201).json({
    status: 'success',
    message: 'Transaction created',
    data: transaction,
  });
});

const findAllByAdmin = asyncHandler(async (req, res) => {
  const { role } = req.user;
  const transaction = await findAllTransactions(role);
  res.status(200).json({
    status: 'success',
    message: 'List of all transactions',
    data: transaction,
  });
});

const findByIdByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const transaction = await findTransactionByIdWithAdmin(role, id);
  res.status(200).json({
    status: 'success',
    message: 'Transaction found',
    data: transaction,
  });
});

const updateTransactionAdminHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await updateTransactionByAdmin(role, id, req.body);
  res.status(200).json({
    status: 'success',
    message: `Transaction with id ${id} updated`,
  });
});

const deleteTransactionAdminHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await deleteTransactionByAdmin(role, id);
  res.status(200).json({
    status: 'success',
    message: `Transaction with id ${id} deleted`,
  });
});

const createNewTransaction = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const transaction = await createTransaction(userId, req.body);

  res.status(201).json({
    status: 'success',
    message: 'Transaction created',
    data: transaction,
  });
});

const findAllByUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const transactions = await findAllTransactionsUser(userId);
  res.status(200).json({
    status: 'success',
    message: 'List of all transactions',
    data: transactions,
  });
});

const findByIdByUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const transaction = await findTransactionById(userId, id);
  res.status(200).json({
    status: 'success',
    message: 'Transaction found',
    data: transaction,
  });
});

const updateTransactionByUserHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { id: userId } = req.user;
  await updateTransaction(userId, id, req.body);
  res.status(200).json({
    status: 'success',
    message: `Transaction with id ${id} updated`,
  });
});

const deleteTransactionByUserHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  await deleteTransaction(userId, id);
  res.status(200).json({
    status: 'success',
    message: `Transaction with id ${id} deleted`,
  });
});

module.exports = {
  createNewTransaction,
  createNewTransactionByAdmin,
  findAllByAdmin,
  findByIdByAdmin,
  updateTransactionAdminHandler,
  deleteTransactionAdminHandler,
  findAllByUser,
  findByIdByUser,
  updateTransactionByUserHandler,
  deleteTransactionByUserHandler,
  findAllLenghtTransactions,
};
