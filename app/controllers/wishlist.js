const asyncHandler = require('express-async-handler');
const { findAllWishlist, createWishlist, deleteWishlist } = require('../services/wishlist');

const findAllWishlistHandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const wishlist = await findAllWishlist(userId);
  res.status(200).json({
    status: 'success',
    message: 'List of all wishlist',
    data: wishlist,
  });
});

const createWishlistHandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const { carId, bikeId } = req.body;
  const wishlist = await createWishlist(userId, carId, bikeId);
  res.status(201).json({
    status: 'success',
    message: 'Wishlist created',
    data: wishlist,
  });
});

const deleteWishlistHandler = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const { id: wishlistId } = req.params;
  const wishlist = await deleteWishlist(userId, wishlistId);
  res.status(200).json({
    status: 'success',
    message: 'Wishlist deleted',
    data: wishlist,
  });
});

module.exports = {
  findAllWishlistHandler,
  createWishlistHandler,
  deleteWishlistHandler,
};
