const cartService = require('../services/cartService.js');

exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getUserCart(req.userId);
    console.log(`[GET /api/cart] Fetching cart for user ${req.userId}:`, cart || []);
    res.json(cart || []);
  } catch (err) {
    console.error('[GET /api/cart] Error:', err);
    res.status(err.message === 'User not found' ? 404 : 500).json({ message: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, productName, img, price, discountPrice, amount } = req.body;
    if (!productId || !productName || !img || !price || amount === undefined) {
      console.log("Invalid cart item data:", req.body);
      return res.status(400).json({ message: 'Invalid cart item data' });
    }
    const cart = await cartService.updateUserCart(req.userId, {
      productId,
      productName,
      img,
      price,
      discountPrice,
      amount
    });
    console.log(`[POST /api/cart] Cart updated for user ${req.userId}:`, cart);
    res.json(cart);
  } catch (err) {
    console.error('[POST /api/cart] Error:', err);
    res.status(err.message === 'User not found' ? 404 : 500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearUserCart(req.userId);
    console.log(`[DELETE /api/cart] Cart cleared for user ${req.userId}. New cart:`, cart);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error('[DELETE /api/cart] Error:', err);
    res.status(err.message === 'User not found' ? 404 : 500).json({ message: err.message });
  }
};