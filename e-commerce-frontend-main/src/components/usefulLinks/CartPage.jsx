import React from 'react';
import { useCart } from './CartContext.jsx';
import { initiatePayment } from './services/razorpayIntegration.js';

const CartPage = () => {
    const { cart } = useCart();

    const handlePayment = () => {
        const totalAmount = cart.reduce((total, item) => total + item.discountedPrice, 0);
        initiatePayment(cart, totalAmount);
    };

    const handleBuyNowForCart = () => {
        const totalAmount = cart.reduce((total, item) => total + item.discountedPrice, 0);
        initiatePayment(cart, totalAmount);
    };

    const handleBuyNow = (item) => {
        initiatePayment([item], item.discountedPrice);
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.map((item) => (
                <div key={item.id}>
                    <h3>{item.productName}</h3>
                    <p>Price: ₹{item.discountedPrice}</p>
                    <button onClick={() => handleBuyNow(item)}>Buy Now</button>
                </div>
            ))}
            <button onClick={handleBuyNowForCart}>Buy Now for Cart</button>
            <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
    );
};

export default CartPage;