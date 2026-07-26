const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true
    },
    price: {
        type: String,
        required: false,
    },
    images: [
        {
            type: String,
        }
    ],
    variants: [
        {
            title: {
                type: String,
                required: false
            },

            price: {
                type: String,
                required: false
            }
        }
    ]
}, {
    timestamps: true
})

const Products = mongoose.model("Products", productSchema)

module.exports = {
    Products
}