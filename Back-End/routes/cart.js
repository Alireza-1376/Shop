const express = require("express");
const cartController = require("../controllers/cart.controller");
const cartRouter = express.Router();

cartRouter.get("/add-to-cart/:productId", cartController.addToCart);
cartRouter.get("/cart" , cartController.getUserCart)

module.exports = {
    cartRouter,
}