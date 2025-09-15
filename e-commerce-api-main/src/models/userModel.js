const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: 'CUSTOMER'
    },
    mobile: {
        type: String
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addresses'
    }],
    paymentInformation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment_information'
    }],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ratings'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews'
    }],
    cart: [{
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        img: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number },
        amount: { type: Number, required: true, min: 1 }
    }],
    orders: [{
        items: [{
            productId: { type: String, required: true },
            productName: { type: String, required: true },
            img: { type: String, required: true },
            price: { type: Number, required: true },
            discountPrice: { type: Number },
            amount: { type: Number, required: true, min: 1 }
        }],
        total: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const user = mongoose.model('users', userSchema);
module.exports = user;