const { Otp } = require("../models/otp");
const generateOtp = require("otp-generator");


async function getPhoneNumber(req, res) {
    const { phoneNumber } = req.body.phoneNumber;
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

}

module.exports = {
    getPhoneNumber,
    verifyOtp,
    signup
}