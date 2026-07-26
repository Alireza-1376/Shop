const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});

const Categories = mongoose.model("Categories", categorySchema);

module.exports = {
    Categories,
}