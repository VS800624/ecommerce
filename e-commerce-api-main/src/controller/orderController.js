const orderService = require('../services/orderService.js');

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.userId);
    res.json(orders || []);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order data: Items missing or not an array' });
    }
    if (typeof total !== 'number' || isNaN(total)) {
      return res.status(400).json({ message: 'Invalid order data: Total must be a number' });
    }
    for (const item of items) {
      if (!item.productId || !item.productName || !item.img || typeof item.price !== 'number' || !item.amount) {
        return res.status(400).json({ message: 'Invalid order item: Missing required fields' });
      }
    }
    const order = await orderService.addUserOrder(req.userId, { items, total });
    res.json(order);
  } catch (err) {
    console.error('Add order error:', err.message, err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};