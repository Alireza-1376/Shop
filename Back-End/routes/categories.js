const express = require("express")
const adminController = require("../controllers/categories.controller");
const categoriesRouter = express.Router();

categoriesRouter.post("/category", adminController.addCategory);
categoriesRouter.get("/category", adminController.getAllCategories);
categoriesRouter.delete("/category/:id", adminController.deleteCategory);
categoriesRouter.put("/category/:id", adminController.updateCategory);

module.exports = {
    categoriesRouter,
}