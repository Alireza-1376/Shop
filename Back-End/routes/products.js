const express = require("express");

const productsController = require("../controllers/products.controller")

const productRouter = express.Router();


productRouter.get("/products", productsController.getAllProducts)
productRouter.put("/products/updateVariant",productsController.updataVariant)
productRouter.get("/products/:id", productsController.getOneProduct)
productRouter.post('/products', productsController.addProduct)
productRouter.put('/products/:id', productsController.editProduct)
productRouter.delete("/products/deleteVariants", productsController.deleteVariant)
productRouter.delete('/products/:id', productsController.deleteProduct)
productRouter.post('/products/image', productsController.addImageProduct)
productRouter.delete("/products/image/:id", productsController.deleteImage)
productRouter.post("/products/variants/:id", productsController.addProductVariants)

module.exports = {
    productRouter
}