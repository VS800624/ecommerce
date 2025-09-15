const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const orderController = require('../controller/orderController.js');

router.get('/', authMiddleware, orderController.getOrders);
router.post('/', authMiddleware, orderController.addOrder);

module.exports = router;