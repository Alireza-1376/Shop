const express = require("express");
const cartController = require("../controllers/cart.controller");
const cartRouter = express.Router();

cartRouter.get("/add-to-cart/:productId", cartController.addToCart);
cartRouter.get("/cart", cartController.getUserCart);
cartRouter.get("/delete-from-cart/:productId", cartController.deleteFromCart);
cartRouter.delete("/delete-all-cartItems", cartController.deleteAllCartItems);

module.exports = {
    cartRouter,
}