const express = require("express");
const mongoose = require("mongoose");
const { categoriesRouter } = require("./routes/categories");
const { productRouter } = require("./routes/products");
const { authRouter } = require("./routes/auth")
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config()

const app = express();

app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "images"))
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

function fileFilter(req, file, cb) {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Credentials" , "true")
    next();
})

app.use(multer({ storage, fileFilter }).single("image"))
app.use(express.static(path.join(__dirname, "images")))
app.use("/admin", categoriesRouter)
app.use("/admin", productRouter)
app.use("/auth", authRouter)

mongoose.connect("mongodb://localhost/Shop").then(() => {
    app.listen(4000, () => {
        console.log("Listening on port 4000")
    })
}).catch((err) => {
    console.log(err)
})
