/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-continue */
const { Transactions } = require('../models');

const calculateQtyCar = async (carId, qtyCar) => {
  let transactions = [];

  if (carId) {
    transactions = await Transactions.findAll({
      where: { carId },
    });
  }

  if (transactions.length === 0) {
    return qtyCar;
  }

  const currentDate = new Date();
  let totalQtySold = 0;

  for (const transaction of transactions) {
    const startDate = new Date(transaction.start_date);
    const endDate = transaction.end_date ? new Date(transaction.end_date) : null;

    if (endDate && currentDate > endDate) {
      continue;
    }

    if (!endDate && currentDate > startDate) {
      continue;
    }

    totalQtySold += transaction.total_car ? transaction.total_car : 0;
  }

  const totalQtyAvailable = qtyCar - totalQtySold;
  return totalQtyAvailable;
};

const calculateQtyBike = async (bikeId, qtyBike) => {
  let transactions = [];

  if (bikeId) {
    transactions = await Transactions.findAll({
      where: { bikeId },
    });
  }

  if (transactions.length === 0) {
    return qtyBike;
  }

  const currentDate = new Date();
  let totalQtySold = 0;

  for (const transaction of transactions) {
    const startDate = new Date(transaction.start_date);
    const endDate = transaction.end_date ? new Date(transaction.end_date) : null;

    if (endDate && currentDate > endDate) {
      continue;
    }

    if (!endDate && currentDate > startDate) {
      continue;
    }

    totalQtySold += transaction.total_bike ? transaction.total_bike : 0;
  }

  const totalQtyAvailable = qtyBike - totalQtySold;
  return totalQtyAvailable;
};

module.exports = {
  calculateQtyCar,
  calculateQtyBike,
};
