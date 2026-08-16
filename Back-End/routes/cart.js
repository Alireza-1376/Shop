const express = require("express");
const cartController = require("../controllers/cart.controller");
const cartRouter = express.Router();

cartRouter.get("/add-to-cart/:productId", cartController.addToCart);
cartRouter.get("/cart", cartController.getUserCart);
cartRouter.get("/delete-from-cart/:productId", cartController.deleteFromCart);
cartRouter.delete("/delete-all-cartItems", cartController.deleteAllCartItems);
cartRouter.post("/cart-paymentRequest", cartController.paymentRequest);
cartRouter.get('/cart-PaymentVerify', cartController.paymentVerify);
cartRouter.get("/orders", cartController.getAllOrders)
cartRouter.post("/order", cartController.getOneOrder)

module.exports = {
    cartRouter,
}