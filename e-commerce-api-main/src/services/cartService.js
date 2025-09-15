const User = require('../models/userModel.js');

exports.getUserCart = async (userId) => {
  const user = await User.findById(userId, 'cart');
  if (!user) {
    throw new Error('User not found');
  }
  return user.cart || [];
};

exports.updateUserCart = async (userId, { productId, productName, img, price, discountPrice, amount }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (amount <= 0) {
    user.cart = user.cart.filter(item => item.productId !== productId);
    console.log(`[POST /api/cart] Removed item ${productId} from cart for user ${userId}`);
  } else {
    const existingItem = user.cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.amount = amount;
      existingItem.productName = productName;
      existingItem.img = img;
      existingItem.price = price;
      existingItem.discountPrice = discountPrice;
      console.log(`[POST /api/cart] Updated item ${productId} in cart for user ${userId}`);
    } else {
      user.cart.push({ productId, productName, img, price, discountPrice, amount });
      console.log(`[POST /api/cart] Added item ${productId} to cart for user ${userId}`);
    }
  }
  await user.save();
  return user.cart;
};

exports.clearUserCart = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  console.warn(`[DELETE /api/cart] Clear cart request received for user ${userId}. Current cart:`, user.cart);
  user.cart = [];
  await user.save();
  return user.cart;
};