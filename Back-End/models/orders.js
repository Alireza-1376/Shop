const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    trackingCode: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        },
        variant: {
            type: String,
            required: false
        },
        quantity: {
            type: Number,
            default: 0,
            min: 0
        }
    }]

}, {
    timestamps: true
})

const Orders = mongoose.model("Orders", orderSchema)

module.exports = {
    Orders
}