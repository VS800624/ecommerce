const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const cartController = require('../controller/cartController.js');

router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, cartController.updateCartItem);
router.delete('/', authMiddleware, cartController.clearCart);

module.exports = router;