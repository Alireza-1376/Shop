const { Categories } = require("../models/categories");

async function getAllCategories(req, res) {
    const totalCategory = await Categories.countDocuments();
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || totalCategory;
    const lastPage = Math.ceil(totalCategory / limit)

    Categories.find().skip((page - 1) * limit).limit(limit).then((categories) => {
        return res.status(200).send({
            categories,
            currentPage: page,
            totalCategory,
            lastPage
        })
    }).catch((err) => {
        console.log(err)
    })
}

function addCategory(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const category = new Categories({
        title: title,
        description: description
    })
    category.save().then((c) => {
        return res.status(201).send(c)
    }).catch((err) => {
        console.log(err)
    })
}

function deleteCategory(req, res) {
    const categoryId = req.params.id;
    Categories.findByIdAndDelete(categoryId).then((category) => {
        return res.status(200).send(category)
    }).catch((err) => {
        console.log(err)
    })
}

function updateCategory(req, res) {
    const categoryId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    Categories.findById(categoryId).then((category) => {
        category.title = title
        category.description = description

        category.save().then((newCategory) => {
            return res.status(200).send(newCategory)
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory,
    updateCategory
}