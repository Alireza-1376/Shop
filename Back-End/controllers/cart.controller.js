const jwt = require("jsonwebtoken");
const { Signup } = require("../models/signup");

async function addToCart(req, res) {
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

module.exports = {
    addToCart,
    getUserCart
}