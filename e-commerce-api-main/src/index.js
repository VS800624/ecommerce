const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send({ message: "welcome to ecommerce api - node", status: true });
});

const authRouter = require('./routes/authRoute.js');
app.use('/auth', authRouter);

const userRouter = require('./routes/userRoute.js');
app.use('/api/users', userRouter);

const cartRouter = require('./routes/cartRoute.js');
app.use('/api/cart', cartRouter);

const orderRouter = require('./routes/orderRoute.js');
app.use('/api/orders', orderRouter);

const paymentRouter = require('./routes/paymentRoute.js');
app.use('/api/payments', paymentRouter);

module.exports = app;