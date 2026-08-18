const jwt = require("jsonwebtoken");
const { Signup } = require("../models/signup");
const ZarinpalCheckout = require('zarinpal-checkout');
const { Payment } = require("../models/payment");
const { Orders } = require("../models/orders");

const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true)

async function addToCart(req, res) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1]
        if (token == "undefined") {
            return res.status(401).send({
                message: "لطفا وارد شوید",
            });
        }
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        const productId = req.params.productId;
        const variantId = req.query.variantId;
        const user = await Signup.findById(verify.id)

        if (!user) {
            return res.status(404).send({
                message: "کاربر پیدا نشد",
            });
        }

        const userCart = user.cart.find((cartItem) => {
            return cartItem.product == productId && cartItem.variant == variantId
        })

        if (userCart) {
            userCart.quantity += 1
        } else {
            user.cart.push({
                product: productId,
                variant: variantId,
                quantity: 1
            })
        }

        user.save().then(() => {
            return res.status(200).send({
                message: "محصول به سبد خرید اضافه شد",
            });
        })
    } catch (error) {
        return res.status(500).send({
            message: "خطایی رخ داده است",
        });
    }

}

async function getUserCart(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({
                message: "لطفا وارد شوید",
            });
        }
        const token = authHeader.split(" ")[1]
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        const user = await Signup.findById(verify.id).populate("cart.product")
        if (user) {
            return res.status(200).send({
                cart: user.cart
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "خطایی رخ داده است",
        });
    }

}

async function deleteFromCart(req, res) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({
                message: "لطفا وارد شوید",
            });
        }

        const token = authHeader.split(" ")[1]
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        const productId = req.params.productId;
        const variantId = req.query.variantId;
        const user = await Signup.findById(verify.id)

        if (!user) {
            return res.status(404).send({
                message: "کاربر پیدا نشد",
            });
        }

        const userCart = user.cart.find((cartItem) => {
            return cartItem.product == productId && cartItem.variant == variantId
        })



        if (userCart) {
            userCart.quantity -= 1
        }
        if (userCart.quantity == 0) {
            const filterUserCart = user.cart.filter((c) => {
                return c.quantity > 0 || c.product != productId
            })
            user.cart = filterUserCart
        }

        user.save().then(() => {
            return res.status(200).send({
                message: "محصول از سبد خرید حذف شد",
            });
        })
    } catch (error) {
        return res.status(500).send({
            message: "خطایی رخ داده است",
        });
    }
}

async function deleteAllCartItems(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({
                message: "لطفا وارد شوید",
            });
        }
        const token = authHeader.split(" ")[1]
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        const user = await Signup.findById(verify.id)

        if (!user) {
            return res.status(404).send({
                message: "کاربر پیدا نشد",
            });
        }

        user.cart = []

        user.save().then(() => {
            return res.status(200).send({
                message: "محصول از سبد خرید حذف شد",
            });
        })
    } catch (error) {
        return res.status(500).send({
            message: "خطایی رخ داده است",
        });
    }
}

async function paymentRequest(req, res) {
    try {
        const phoneNumber = req.body.phoneNumber;
        const address = req.body.address;

        const user = await Signup.findOne({ phoneNumber }).populate("cart.product");

        if (!user) {
            return res.status(404).send({
                message: "کاربر پیدا نشد",
            });
        }

        const totalPrice = user.cart.reduce((acc, curr) => {
            return acc + Number(curr.product.price) * curr.quantity;
        }, 0);

        const response = await zarinpal.PaymentRequest({
            Amount: totalPrice,
            CallbackURL: "http://localhost:4000/cart-PaymentVerify",
            Description: "پرداخت تستی",
            Email: user.email,
            Mobile: user.phoneNumber,
        });

        await Payment.create({
            phoneNumber: user.phoneNumber,
            address: address,
            amount: totalPrice,
            authority: response.authority,
            userId: user._id
        });

        return res.status(200).send({
            url: response.url,
        });

    } catch (error) {
        return res.status(500).send({
            message: "خطا در ایجاد درخواست پرداخت",
        });
    }
}

async function paymentVerify(req, res) {
    try {
        const authority = req.query.Authority;
        const status = req.query.Status;
        const payment = await Payment.findOne({
            authority: authority,
        });

        if (!payment) {
            return res.status(404).send({
                message: "اطلاعات پرداخت پیدا نشد",
            });
        }

        if (status === "NOK") {
            await Payment.findByIdAndDelete(payment._id)
            return res.redirect("http://localhost:3000/faild");
        }

        if (status === "OK") {

            const response = await zarinpal.PaymentVerification({
                Authority: authority,
                Amount: payment.amount,
            });

            if (response.status === 100) {
                const user = await Signup.findById(payment.userId).populate("cart.product");
                const order = await Orders.create({
                    phoneNumber: payment.phoneNumber,
                    address: payment.address,
                    trackingCode: response.refId,
                    amount: payment.amount,
                    userId: payment.userId,
                    products: user.cart,
                    situation: "checking"
                });
                await Payment.findByIdAndDelete(payment._id)
                user.cart = []
                user.save()
                return res.redirect(
                    `http://localhost:3000/success?orderId=${order._id}`
                );
            }

            return res.redirect("http://localhost:3000/faild");
        }

    } catch (error) {
        return res.status(500).send({
            message: "خطا در تایید پرداخت",
        });
    }
}

async function getOneOrder(req, res) {
    const orderId = req.body.orderId;
    Orders.findById(orderId).populate("products.product").then((order) => {
        return res.status(200).send({
            _id: order._id,
            phoneNumber: order.phoneNumber,
            address: order.address,
            trackingCode: order.trackingCode,
            amount: order.amount,
            userId: order.userId,
            createdAt: order.createdAt,
            products: order.products,
            situation: order.situation
        })
    })
}

async function getAllOrders(req, res) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({
                message: "لطفا وارد شوید",
            });
        }
        const token = authHeader.split(" ")[1]
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        const orders = await Orders.find({ userId: verify.id }).populate("products.product")
        if (orders) {
            return res.status(200).send(orders)
        } else {
            return res.status(404).send({
                message: "سفارش یافت نشد"
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "خطای سرور"
        })
    }
}


module.exports = {
    addToCart,
    getUserCart,
    deleteFromCart,
    deleteAllCartItems,
    paymentRequest,
    paymentVerify,
    getAllOrders,
    getOneOrder
}