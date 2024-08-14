import "../../Database/connection"
const Category = require("../../Models/categoryModel")

export default async function handler(req, res) {
    
        if (req.method === "POST") {
            let categoryToAdd = await Category.create({
                category_name: req.body.category_name,
                parent_category: req.body.parent_category? req.body.parent_category : null
            });
            if (!categoryToAdd) {
                return res.status(400).json({ error: "Something went wrong" })
            }
            res.send(categoryToAdd)

        } else if (req.method === "GET") {
            if (req.query.id) {
                let category = await Category.findById(req.query.id).populate('parent_category')
                if (!category) {
                    return res.status(404).json({ error: "Category not found" })
                }
                res.send(category);
            } else if (req.query.parent_id) {
                let category = await Category.find({parent_category: req.query.parent_id}).populate('parent_category')
                if (!category) {
                    return res.status(404).json({ error: "Category not found" })
                }
                res.send(category);
            } else {
                let categories = await Category.find({parent_category: null}).populate('parent_category')
                res.send(categories)
            }

        } else if (req.method === "PATCH") {
            let categoryToUpdate = await Category.findByIdAndUpdate(req.query.id, {
                category_name: req.body.category_name
            }, { new: true });
            if (!categoryToUpdate) {
                return res.status(400).json({ error: "Something went wrong, couldn't update" })
            }
            res.send(categoryToUpdate)

        } else if (req.method === "DELETE") {
            let deleteCategory = await Category.findByIdAndDelete(req.query.id)
            if (!deleteCategory) {
                return res.status(404).json({ error: "Category not found" })
            }
            res.send({ message: "Category deleted successfully" })
        } else {
            res.status(405).json({ error: "Method not allowed" })

        }
    
}