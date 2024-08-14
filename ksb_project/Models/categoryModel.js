const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        trim: true,
        required: true,
    },
    parent_category:{
        type: ObjectId,
        ref: "Category"
    }

}, { timestamps: true })


module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);