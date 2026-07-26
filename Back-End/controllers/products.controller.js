const { log } = require("console");
const { Products } = require("../models/products");
const fs = require("fs");
const path = require("path");

async function getAllProducts(req, res) {
    const totalProducts = await Products.countDocuments();
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || totalProducts;
    const lastPage = Math.ceil(totalProducts / limit);

    Products.find().skip((page - 1) * limit).limit(limit).populate("category").then((products) => {
        return res.status(200).send({
            products,
            currentPage: page,
            totalProducts,
            lastPage
        })
    }).catch((err) => {
        console.log(err)
    })
}

function getOneProduct(req, res) {
    const productId = req.params.id;
    Products.findById(productId).then((product) => {
        return res.status(200).send(product)
    }).catch((err) => {
        console.log(err)
    })
}

function addProduct(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const categoryId = req.body.categoryId;
    const price = req.body.price;

    const product = new Products({
        title: title,
        description: description,
        category: categoryId,
        price: price
    })
    product.save().then((product) => {
        return res.status(201).send(product)
    }).catch((err) => {
        console.log(err)
    })
}

function editProduct(req, res) {
    const productId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const categoryId = req.body.categoryId;

    Products.findById(productId).then((product) => {
        product.title = title
        product.description = description
        product.category = categoryId
        product.save().then((data) => {
            return res.status(200).send(data)
        })
    }).catch((err) => {
        console.log(err)
    })

}

function addImageProduct(req, res) {
    const productId = req.body.productId;
    const image = req.file;
    Products.findById(productId).then((product) => {
        product.images.push(image.filename)
        product.save().then((addImage) => {
            return res.status(201).send(addImage)
        })
    }).catch((err) => {
        console.log(err)
    })
}

function deleteImage(req, res) {
    const productId = req.params.id;
    const image = req.body.image;
    Products.findById(productId).then((product) => {
        const newImages = product.images.filter((img) => {
            return img != image
        })
        product.images = newImages;
        fs.unlink(path.join(__dirname, "..", "images", image), (err) => {
            console.log(err)
        })
        product.save().then((p) => {
            return res.status(200).send(p)
        })
    }).catch((err) => {
        console.log(err)
    })
}

function deleteProduct(req, res) {
    const productId = req.params.id;
    Products.findByIdAndDelete(productId).then((product) => {
        product.images.map((img) => {
            fs.unlink(path.join(__dirname, "..", "images", img), (err) => {
                console.log(err)
            })
        })
        return res.status(200).send(product)
    }).catch((err) => {
        console.log(err)
    })
}

function addProductVariants(req, res) {
    const productId = req.params.id;
    const title = req.body.title;
    const price = req.body.price;
    Products.findById(productId).then((product) => {
        product.variants.push({ title, price })
        product.save().then((data) => {
            return res.status(201).send(data)
        })
    }).catch((err) => {
        console.log(err)
    })
}

function deleteVariant(req, res) {
    const variantId = req.query.variantId;
    const productId = req.query.productId;

    Products.findById(productId).then((product) => {
        const filterVariant = product.variants.filter((variant) => {
            return variant._id != variantId
        })
        product.variants = filterVariant;
        product.save().then((data) => {
            return res.status(200).send(data)
        })
    }).catch((err) => {
        console.log(err)
    })
}

function updataVariant(req, res) {
    const title = req.body.title;
    const price = req.body.price;
    const variantId = req.query.variantId;
    const productId = req.query.productId;
    Products.findById(productId).then((product)=>{
        const findVariant = product.variants.find((v)=>{
            return v._id==variantId
        })
        findVariant.title=title;
        findVariant.price=price;
        product.save().then((data)=>{
            return res.status(200).send(data)
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = {
    getAllProducts,
    getOneProduct,
    addProduct,
    addImageProduct,
    deleteImage,
    deleteProduct,
    editProduct,
    addProductVariants,
    deleteVariant,
    updataVariant
}

