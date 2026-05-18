const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

// @route  GET /api/wishlist
// @desc   Get user's wishlist
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('wishlist');
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  POST /api/wishlist/:productId
// @desc   Add product to wishlist
router.post('/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { productId } = req.params;

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  DELETE /api/wishlist/:productId
// @desc   Remove product from wishlist
router.delete('/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId
    );
    await user.save();
    res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
