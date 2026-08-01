const { Otp } = require("../models/otp");
const generateOtp = require("otp-generator");
const { Signup } = require("../models/signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getPhoneNumber(req, res) {
    const phoneNumber = req.body.phoneNumber.phoneNumber;

    const existUser = await Signup.findOne({ phoneNumber: phoneNumber })

    if (existUser) {
        return res.status(409).send({
            message: "کاربری با این شماره قبلا ثبت نام کرده است"
        })
    }


    const otpCode = generateOtp.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        digits: true,
        specialChars: false
    })
    const getOtp = await Otp.findOne({ phoneNumber: phoneNumber })
    if (!getOtp) {
        const newOtp = new Otp({
            phoneNumber: phoneNumber,
            otp: otpCode
        })
        const otp = await newOtp.save();
        if (otp) {
            return res.status(200).send(otp)
        } else {
            return res.status(500).send({
                message: "خطای سرور"
            })
        }
    }


    if (getOtp.expiresAt > new Date()) {
        return res.status(400).send({
            message: "کد قبلاً ارسال شده است"
        });
    }

    await Otp.findOneAndDelete({ phoneNumber })

    const newOtp = new Otp({
        phoneNumber: phoneNumber,
        otp: otpCode
    })
    const otp = await newOtp.save();
    if (otp) {
        return res.status(200).send(otp)
    } else {
        return res.status(500).send({
            message: "خطای سرور"
        })
    }

}

async function verifyOtp(req, res) {
    const { otp } = req.body.otp;

    const otpCode = await Otp.findOne({ otp: otp })

    if (!otpCode) {
        return res.status(400).send({
            message: "کد تایید نامعتبر است"
        })
    }

    if (new Date() > new Date(otpCode.expiresAt)) {
        return res.status(400).send({
            message: "کد تایید منقضی شده است"
        })
    }

    return res.status(200).send({
        message: "تأیید هویت با موفقیت انجام شد."
    })
}

async function signup(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    bcrypt.hash(password, 12).then((hashedPassword) => {
        const signupUser = new Signup({
            username,
            email,
            phoneNumber,
            password: hashedPassword
        })
        signupUser.save().then((data) => {
            return res.status(201).send({
                message: "ثبت نام با موفقیت انجام شد ،لطفا وارد شوید"
            })
        }).catch(() => {
            return res.status(400).send({
                message: "ثبت نام انجام نشد"
            })
        })
    })
}

async function login(req, res) {
    const password = req.body.password.password;
    const phoneNumber = req.body.phoneNumber;
    const user = await Signup.findOne({ phoneNumber: phoneNumber })
    if (user) {
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const token = jwt.sign({ phoneNumber: user.phoneNumber }, process.env.SECRET_KEY, {
                    expiresIn: "24h"
                })
                return res.status(200).send({
                    message: "ورود با موفقیت انجام شد",
                    token: token
                })
            } else {
                return res.status(401).send({
                    message: "رمزعبور نادرست است"
                })
            }
        })
    } else {
        return res.status(401).send({
            message: "کاربری با این شماره موبایل یافت نشد"
        })
    }
}

async function recovery(req, res) {
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const user = await Signup.findOne({ phoneNumber: phoneNumber })
    if (user) {
        bcrypt.hash(password, 12).then((hashedPassword) => {
            user.password = hashedPassword;
            user.save().then(() => {
                return res.status(200).send({
                    message: "رمزعبور با موفقیت ویرایش شد ، لطفا وارد شوید "
                })
            })
        })
    } else {
        return res.status(404).send({
            message: "کاربر با این شماره موبایل ثبت نام نکرده است"
        })
    }
}

module.exports = {
    getPhoneNumber,
    verifyOtp,
    signup,
    login,
    recovery
}