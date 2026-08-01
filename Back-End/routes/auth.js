const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/login", authController.getPhoneNumber);
authRouter.post("/verify-otp", authController.verifyOtp);
authRouter.post("/signup", authController.signup)
authRouter.post("/password", authController.login)
authRouter.put("/recovery" , authController.recovery)

module.exports = {
    authRouter,
}