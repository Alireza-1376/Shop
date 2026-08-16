const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    authority: {
        type: String,
        required: true,
    },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = {
    Payment,
};