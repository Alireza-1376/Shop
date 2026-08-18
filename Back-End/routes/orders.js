const express = require("express");
const ordersController = require("../controllers/orders.controller");
const ordersRouter = express.Router();

ordersRouter.get("/get-orders" , ordersController.getAllOrders)
ordersRouter.put("/change-status", ordersController.changeStatus)

module.exports = {
    ordersRouter,
}