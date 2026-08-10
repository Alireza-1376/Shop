const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    },
    cart: [
        {
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
        }
    ]
},
    {
        timestamps: true
    }
)

const Signup = mongoose.model("Signup", signupSchema)

module.exports = {
    Signup
}