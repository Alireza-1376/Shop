const express = require("express");
const usersController = require("../controllers/users.controller");
const usersRouter = express.Router();

usersRouter.get("/users", usersController.getAllUsers);
usersRouter.delete("/user", usersController.deleteUser);
usersRouter.put("/change-role", usersController.changeRole);

module.exports = {
    usersRouter,
}