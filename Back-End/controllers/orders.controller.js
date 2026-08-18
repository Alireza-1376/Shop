const { Orders } = require("../models/orders");

async function getAllOrders(req, res) {
    const totalOrders = await Orders.countDocuments();
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || totalOrders;
    const lastPage = Math.ceil(totalOrders / limit);

    const orders = await Orders.find().populate("products.product").skip((page - 1) * limit).limit(limit)
    if (orders) {
        return res.status(200).send({
            orders,
            currentPage: page,
            totalOrders,
            lastPage
        })
    } else {
        return res.status(404).send({
            message: "سفارش یافت نشد"
        })
    }
}

async function changeStatus(req, res) {
    const orderId = req.body.id;
    const order = await Orders.findById(orderId)
    order.situation = order.situation == "checking" ? "sent" : "checking"
    order.save().then(() => {
        return res.status(200).send({
            message: "وضعیت سفارش تغییر یافت"
        })
    })
}

module.exports = {
    changeStatus,
    getAllOrders
}