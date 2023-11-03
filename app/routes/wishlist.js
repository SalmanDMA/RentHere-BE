const express = require('express');
const { authCheck } = require('../middleware/authCheck');
const { findAllWishlistHandler, createWishlistHandler, deleteWishlistHandler } = require('../controllers/wishlist');

const router = express.Router();

router.get('/wishlists', authCheck, findAllWishlistHandler);
router.post('/wishlists', authCheck, createWishlistHandler);
router.delete('/wishlists/:id', authCheck, deleteWishlistHandler);

module.exports = router;
