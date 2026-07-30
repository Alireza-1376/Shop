const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: function () {
            return new Date(Date.now() + (60 * 1000))
        },
        expires: 0,
    }
})

const Otp = mongoose.model("Otp", otpSchema)

module.exports = {
    Otp,
}