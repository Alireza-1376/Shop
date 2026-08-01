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
    }
},
    {
        timestamps: true
    }
)

const Signup = mongoose.model("Signup", signupSchema)

module.exports = {
    Signup
}