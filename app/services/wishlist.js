/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { Wishlist, Cars, Bikes } = require('../models');
const InvariantError = require('../exeptions/InvariantError');
const NotFoundError = require('../exeptions/NotFoundError');

const findAllWishlist = async (userId) => {
  const wishlist = await Wishlist.findAll({
    where: {
      userId,
    },
  });

  const wishlistWithCarsAndBikes = [];

  for (const wishlistItem of wishlist) {
    const wishlistData = wishlistItem.dataValues;

    const { carId, bikeId } = wishlistData;

    // Hanya mengambil data mobil jika carId tidak null
    if (carId !== null) {
      const car = await Cars.findOne({
        where: {
          id: carId,
        },
      });

      wishlistData.car = car;
    }

    // Hanya mengambil data sepeda jika bikeId tidak null
    if (bikeId !== null) {
      const bike = await Bikes.findOne({
        where: {
          id: bikeId,
        },
      });

      wishlistData.bike = bike;
    }

    wishlistWithCarsAndBikes.push(wishlistData);
  }

  return wishlistWithCarsAndBikes;
};

const createWishlist = async (userId, carId, bikeId) => {
  const existingWishlist = await Wishlist.findOne({
    where: {
      userId,
      carId,
      bikeId,
    },
  });

  if (existingWishlist) {
    if (existingWishlist.carId === carId) {
      throw new InvariantError(`Wishlist with car id ${carId} already exists`);
    } else if (existingWishlist.bikeId === bikeId) {
      throw new InvariantError(`Wishlist with bike id ${bikeId} already exists`);
    }
  }

  const wishlist = await Wishlist.create({
    userId,
    carId,
    bikeId,
  });

  return wishlist;
};

const deleteWishlist = async (userId, wishlistId) => {
  const existingWishlist = await Wishlist.findOne({
    where: {
      userId,
      id: wishlistId,
    },
  });

  if (!existingWishlist) {
    throw new NotFoundError('Wishlist not found');
  }

  await existingWishlist.destroy();
  return existingWishlist;
};

module.exports = {
  findAllWishlist,
  createWishlist,
  deleteWishlist,
};
