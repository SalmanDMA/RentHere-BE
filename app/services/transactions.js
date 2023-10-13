/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const AuthorizationError = require('../exeptions/AuthorizationError');
const InvariantError = require('../exeptions/InvariantError');
const NotFoundError = require('../exeptions/NotFoundError');
const {
  Transactions, Cars, Bikes, Users,
} = require('../models');

const findLenghtTransaction = async () => {
  const transaction = await Transactions.findAll();

  return transaction.length;
};

const createTransaction = async (userId, transactionData) => {
  const carId = transactionData.carId ? transactionData.carId : null;
  const bikeId = transactionData.bikeId ? transactionData.bikeId : null;

  const existingTransaction = await Transactions.findOne({
    where: {
      userId,
      carId: transactionData.carId,
      bikeId: transactionData.bikeId,
    },
  });

  if (existingTransaction) {
    if (existingTransaction.carId === transactionData.carId) {
      throw new InvariantError(`Transaction with car id ${transactionData.carId} already exists`);
    } else if (existingTransaction.bikeId === transactionData.bikeId) {
      throw new InvariantError(`Transaction with bike id ${transactionData.bikeId} already exists`);
    }
  }

  const {
    startDate, totalCar, totalBike, payment, rentalDuration,
  } = transactionData;

  const convertDate = new Date(startDate);
  const durationInMilliseconds = rentalDuration * 24 * 60 * 60 * 1000;
  const endDate = new Date(convertDate.getTime() + durationInMilliseconds);
  const status = 'waiting';
  let totalAmountCar = 0;
  let totalAmountBike = 0;
  let priceCar = 0;
  let priceBike = 0;

  const car = await Cars.findOne({ where: { id: carId } });
  if (car) {
    totalAmountCar = totalCar * car.price;
    priceCar = car.price;
  }

  const bike = await Bikes.findOne({ where: { id: bikeId } });
  if (bike) {
    totalAmountBike = totalBike * bike.price;
    priceBike = bike.price;
  }

  const totalCost = totalAmountCar + totalAmountBike;

  const transaction = {
    userId,
    carId,
    bikeId,
    start_date: convertDate,
    rental_duration: rentalDuration,
    end_date: endDate,
    price_car: priceCar,
    total_car: totalCar,
    total_amount_car: totalAmountCar,
    price_bike: priceBike,
    total_bike: totalBike,
    total_amount_bike: totalAmountBike,
    total_cost: totalCost,
    payment,
    status,
  };

  const newTransaction = await Transactions.create(transaction);
  return newTransaction;
};

const createTransactionByAdmin = async (userRole, transactionData) => {
  const carId = transactionData.carId ? transactionData.carId : null;

  const bikeId = transactionData.bikeId ? transactionData.bikeId : null;

  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }
  const existingTransaction = await Transactions.findOne({
    where: {
      userId: transactionData.userId,
      carId,
      bikeId,
    },
  });

  if (existingTransaction) {
    if (existingTransaction.carId === transactionData.carId) {
      throw new InvariantError(`Transaction with car id ${transactionData.carId} already exists`);
    } else if (existingTransaction.bikeId === transactionData.bikeId) {
      throw new InvariantError(`Transaction with bike id ${transactionData.bikeId} already exists`);
    }
  }

  const {
    startDate, totalCar, totalBike, payment, status, rentalDuration,
    userId,
  } = transactionData;

  const convertDate = new Date(startDate);
  const durationInMilliseconds = rentalDuration * 24 * 60 * 60 * 1000;
  const endDate = new Date(convertDate.getTime() + durationInMilliseconds);
  let totalAmountCar = 0;
  let totalAmountBike = 0;
  let priceCar = 0;
  let priceBike = 0;

  const car = await Cars.findOne({ where: { id: carId } });
  if (car) {
    totalAmountCar = totalCar * car.price;
    priceCar = car.price;
  }

  const bike = await Bikes.findOne({ where: { id: bikeId } });
  if (bike) {
    totalAmountBike = totalBike * bike.price;
    priceBike = bike.price;
  }

  const totalCost = totalAmountCar + totalAmountBike;

  const transaction = {
    userId,
    carId,
    bikeId,
    start_date: convertDate,
    rental_duration: rentalDuration,
    end_date: endDate,
    price_car: priceCar,
    total_car: totalCar,
    total_amount_car: totalAmountCar,
    price_bike: priceBike,
    total_bike: totalBike,
    total_amount_bike: totalAmountBike,
    total_cost: totalCost,
    payment,
    status,
  };

  const newTransaction = await Transactions.create(transaction);
  return newTransaction;
};

const findAllTransactions = async (userRole) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const transactions = await Transactions.findAll();

  // Mengambil data mobil dan data motor untuk setiap transaksi
  const transactionsWithCarsAndBikes = [];

  for (const transaction of transactions) {
    const transactionData = transaction.dataValues;
    const { carId } = transactionData;
    const { bikeId } = transactionData;
    const { userId } = transactionData;

    // Hanya mengambil data mobil jika carId tidak null
    if (carId !== null) {
      const car = await Cars.findOne({
        where: {
          id: carId,
        },
      });

      transactionData.car = car ? { ...car.dataValues } : null;
    }

    // Hanya mengambil data sepeda jika bikeId tidak null
    if (bikeId !== null) {
      const bike = await Bikes.findOne({
        where: {
          id: bikeId,
        },
      });

      transactionData.bike = bike ? { ...bike.dataValues } : null;
    }

    // Mengambil data user
    if (userId !== null) {
      const user = await Users.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ['password'],
        },
      });

      transactionData.user = user ? { ...user.dataValues } : null;
    }

    transactionsWithCarsAndBikes.push(transactionData);
  }

  return transactionsWithCarsAndBikes;
};

const findTransactionByIdWithAdmin = async (userRole, transactionId) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const transaction = await Transactions.findOne({
    where: {
      id: transactionId,
    },
  });

  if (!transaction) {
    throw new NotFoundError('Transaction not found');
  }

  const transactionData = transaction.dataValues;
  const { carId } = transactionData;
  const { bikeId } = transactionData;
  const { userId } = transactionData;

  // Hanya mengambil data mobil jika carId tidak null
  if (carId !== null) {
    const car = await Cars.findOne({
      where: {
        id: carId,
      },
    });

    transactionData.car = car ? { ...car.dataValues } : null;
  }

  // Hanya mengambil data sepeda jika bikeId tidak null
  if (bikeId !== null) {
    const bike = await Bikes.findOne({
      where: {
        id: bikeId,
      },
    });

    transactionData.bike = bike ? { ...bike.dataValues } : null;
  }

  // Mengambil data user
  if (userId !== null) {
    const user = await Users.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ['password'],
      },
    });
    transactionData.user = user ? { ...user.dataValues } : null;
  }

  return transactionData;
};

const updateTransactionByAdmin = async (userRole, transactionId, transactionData) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }

  const existingTransaction = await Transactions.findOne({
    where: {
      id: transactionId,
    },
  });

  if (!existingTransaction) {
    throw new NotFoundError('Transaction not found');
  }

  const {
    startDate, totalCar, totalBike, payment, status, carId, bikeId, rentalDuration,
  } = transactionData;

  const convertDate = new Date(startDate);
  const durationInMilliseconds = rentalDuration * 24 * 60 * 60 * 1000;
  const endDate = new Date(convertDate.getTime() + durationInMilliseconds);
  let totalAmountCar = 0;
  let totalAmountBike = 0;
  let priceCar = 0;
  let priceBike = 0;

  const car = await Cars.findOne({ where: { id: carId } });
  if (car) {
    totalAmountCar = totalCar * car.price;
    priceCar = car.price;
  }

  const bike = await Bikes.findOne({ where: { id: bikeId } });
  if (bike) {
    totalAmountBike = totalBike * bike.price;
    priceBike = bike.price;
  }

  const totalCost = totalAmountCar + totalAmountBike;

  if (totalCar) existingTransaction.total_car = totalCar;
  if (totalBike) existingTransaction.total_bike = totalBike;
  if (totalCost) existingTransaction.total_cost = totalCost;
  if (payment) existingTransaction.payment = payment;
  if (status) existingTransaction.status = status;
  if (carId) existingTransaction.carId = carId;
  if (totalAmountBike) existingTransaction.total_amount_bike = totalAmountBike;
  if (bikeId) existingTransaction.bikeId = bikeId;
  if (priceCar) existingTransaction.price_car = priceCar;
  if (priceBike) existingTransaction.price_bike = priceBike;
  if (totalAmountCar) existingTransaction.total_amount_car = totalAmountCar;
  if (rentalDuration) existingTransaction.rental_duration = rentalDuration;
  if (startDate) existingTransaction.start_date = convertDate;
  if (endDate) existingTransaction.end_date = endDate;

  await existingTransaction.save();
  return existingTransaction;
};

const deleteTransactionByAdmin = async (userRole, transactionId) => {
  if (userRole !== 'ADMIN') {
    throw new AuthorizationError('You must be an admin, not a user');
  }
  const transaction = await Transactions.findOne({
    where: {
      id: transactionId,
    },
  });

  if (!transaction) {
    throw new NotFoundError('Transaction not found');
  }

  await transaction.destroy();
  return transaction;
};

const findAllTransactionsUser = async (userId) => {
  const transactions = await Transactions.findAll({
    where: {
      userId,
    },
  });

  // Membuat array untuk menyimpan data transaksi yang sudah diubah
  const transactionsWithCarsAndBikes = [];

  for (const transaction of transactions) {
    const transactionData = transaction.dataValues;
    const { carId } = transactionData;
    const { bikeId } = transactionData;

    // Hanya mengambil data mobil jika carId tidak null
    if (carId !== null) {
      const car = await Cars.findOne({
        where: {
          id: carId,
        },
      });

      transactionData.car = car ? { ...car.dataValues } : null;
    }

    // Hanya mengambil data sepeda jika bikeId tidak null
    if (bikeId !== null) {
      const bike = await Bikes.findOne({
        where: {
          id: bikeId,
        },
      });

      transactionData.bike = bike ? { ...bike.dataValues } : null;
    }

    // Menambahkan data transaksi yang sudah diubah ke dalam array
    transactionsWithCarsAndBikes.push(transactionData);
  }

  return transactionsWithCarsAndBikes;
};

const findTransactionById = async (userId, transactionId) => {
  const transaction = await Transactions.findOne({
    where: {
      userId,
      id: transactionId,
    },
  });

  if (!transaction) {
    throw new NotFoundError('Transaction not found');
  }

  const transactionData = transaction.dataValues;
  const { carId } = transactionData;
  const { bikeId } = transactionData;

  // Hanya mengambil data mobil jika carId tidak null
  if (carId !== null) {
    const car = await Cars.findOne({
      where: {
        id: carId,
      },
    });

    transactionData.car = car ? { ...car.dataValues } : null;
  }

  // Hanya mengambil data sepeda jika bikeId tidak null
  if (bikeId !== null) {
    const bike = await Bikes.findOne({
      where: {
        id: bikeId,
      },
    });

    transactionData.bike = bike ? { ...bike.dataValues } : null;
  }

  return transactionData;
};

const updateTransaction = async (userId, transactionId, transactionData) => {
  const existingtransaction = await Transactions.findOne({
    where: {
      userId,
      id: transactionId,
    },
  });

  if (!existingtransaction) {
    throw new NotFoundError('Transaction not found');
  }

  const {
    startDate, totalCar, totalBike, payment,
    rentalDuration, carId, bikeId,
  } = transactionData;

  const convertDate = new Date(startDate);
  const durationInMilliseconds = rentalDuration * 24 * 60 * 60 * 1000;
  const endDate = new Date(convertDate.getTime() + durationInMilliseconds);
  const status = 'Pending';
  let totalAmountCar = 0;
  let totalAmountBike = 0;
  let priceCar = 0;
  let priceBike = 0;

  const car = await Cars.findOne({ where: { id: carId } });
  if (car) {
    totalAmountCar = totalCar * car.price;
    priceCar = car.price;
  }

  const bike = await Bikes.findOne({ where: { id: bikeId } });
  if (bike) {
    totalAmountBike = totalBike * bike.price;
    priceBike = bike.price;
  }

  const totalCost = totalAmountCar + totalAmountBike;

  if (totalCar) existingtransaction.total_car = totalCar;
  if (totalBike) existingtransaction.total_bike = totalBike;
  if (totalCost) existingtransaction.total_cost = totalCost;
  if (payment) existingtransaction.payment = payment;
  if (status) existingtransaction.status = status;
  if (carId) existingtransaction.carId = carId;
  if (totalAmountCar) existingtransaction.total_amount_car = totalAmountCar;
  if (priceCar) existingtransaction.price_car = priceCar;
  if (priceBike) existingtransaction.price_bike = priceBike;
  if (bikeId) existingtransaction.bikeId = bikeId;
  if (totalAmountBike) existingtransaction.total_amount_bike = totalAmountBike;
  if (rentalDuration) existingtransaction.rental_duration = rentalDuration;
  if (startDate) existingtransaction.start_date = convertDate;
  if (endDate) existingtransaction.end_date = endDate;

  const transactionUpdated = await existingtransaction.save();

  return transactionUpdated;
};

const deleteTransaction = async (userId, transactionId) => {
  const transaction = await Transactions.findOne({
    where: {
      userId,
      id: transactionId,
    },
  });

  if (!transaction) {
    throw new NotFoundError('Transaction not found');
  }

  await transaction.destroy();
  return transaction;
};

module.exports = {
  createTransaction,
  createTransactionByAdmin,
  findLenghtTransaction,
  findAllTransactions,
  findTransactionByIdWithAdmin,
  updateTransactionByAdmin,
  deleteTransactionByAdmin,
  findAllTransactionsUser,
  findTransactionById,
  updateTransaction,
  deleteTransaction,
};
