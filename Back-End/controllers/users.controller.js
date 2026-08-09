const jwt = require("jsonwebtoken");
const { Signup } = require("../models/signup");

async function getAllUsers(req, res) {
    const totalUsers = await Signup.countDocuments();
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || totalUsers;
    const lastPage = Math.ceil(totalUsers / limit);

    Signup.find().skip((page - 1) * limit).limit(limit).then((users) => {
        return res.status(200).send({
            users,
            currentPage: page,
            totalUsers,
            lastPage
        })
    }).catch((err) => {
        return res.status(500).send({
            message: "خطای سرور"
        })
    })
}

async function deleteUser(req, res) {
    const id = req.body.id;
    const phoneNumber = req.body.phoneNumber;
    const user = await Signup.findById(id);

    if (phoneNumber == process.env.ADMIN_PHONENUMBER) {
        return res.status(403).send({
            message: "حذف امکان پذیر نیست"
        })
    }

    if (user.role == "admin") {
        return res.status(403).send({
            message: "حذف امکان پذیر نیست"
        })
    }

    Signup.findByIdAndDelete(id).then(() => {
        return res.status(200).send({
            message: "کاربر حذف شد"
        })
    })

}

async function changeRole(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1]
    const verify = jwt.verify(token, process.env.SECRET_KEY)
    const id = req.body.id;
    const phoneNumber = req.body.phoneNumber;
    const user = await Signup.findById(id)

    if (phoneNumber == process.env.ADMIN_PHONENUMBER) {
        return res.status(403).send({
            message: "تغییر نقش امکان پذیر نیست"
        })
    }

    if (user.phoneNumber == verify.phoneNumber) {
        return res.status(403).send({
            message: "تغییر نقش امکان پذیر نیست"
        })
    }

    user.role = user.role == "admin" ? "user" : "admin";
    user.save().then(() => {
        return res.status(200).send({
            message: "نقش کاربر تغییر یافت"
        })
    })

}

module.exports = {
    getAllUsers,
    deleteUser,
    changeRole
}

