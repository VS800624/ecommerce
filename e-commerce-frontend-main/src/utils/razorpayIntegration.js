export const initiatePayment = async (cartItems, totalAmount) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('https://e-commerce-h39e.onrender.com/api/payments/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: totalAmount, cart: cartItems }),
        });
        const order = await response.json();
  
        if (!order.id) {
          return reject(new Error('Failed to create order'));
        }
  
        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  
        const options = {
          key: razorpayKey,
          amount: order.amount,
          currency: order.currency,
          name: 'E-Commerce Store',
          description: `Payment for ${cartItems.length} item(s)`,
          order_id: order.id,
          handler: function (response) {
            resolve({ success: true, data: response });
          },
          modal: {
            ondismiss: function () {
              reject(new Error('Payment canceled by user'));
            },
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9999999999',
          },
          notes: {
            items: JSON.stringify(cartItems.map(item => ({
              id: item.id,
              productName: item.productName,
              amount: item.amount || 1,
            }))),
          },
          theme: {
            color: '#3399cc',
          },
        };
  
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response) {
          reject(new Error('Payment failed: ' + response.error.description));
        });
        razorpay.open();
      } catch (error) {
        reject(error);
      }
    });
  };