const paymentService = require('../services/paymentService.js');

exports.createOrder = async (req, res) => {
    const { amount } = req.body;
    try {
        const order = await paymentService.createRazorpayOrder(amount);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error in createOrder controller:', error);
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
};

exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    try {
        const isValid = await paymentService.verifyPaymentSignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );
        if (isValid) {
            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error in verifyPayment controller:', error);
        res.status(500).json({ error: 'Payment verification failed', details: error.message });
    }
};