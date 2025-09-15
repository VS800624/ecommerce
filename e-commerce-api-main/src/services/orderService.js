const User = require('../models/userModel.js');

exports.getUserOrders = async (userId) => {
  const user = await User.findById(userId, 'orders');
  if (!user) {
    throw new Error('User not found');
  }
  return user.orders || [];
};

exports.addUserOrder = async (userId, { items, total }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const order = {
    items,
    total,
    timestamp: new Date()
  };
  user.orders.push(order);
  user.cart = [];
  await user.save();
  return order;
};