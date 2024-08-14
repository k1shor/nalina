const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    product_title: {
        type: String,
        trim: true,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    application: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    capacity: {
        type: String,

    },
    head: {
        type: String,
    },
    temperature: {
        type: String,
    },
    motor_rating: {
        type: String,
    },
    tank_capacity: {
        type: String,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
