
import "../../Database/connection"
const Product = require("../../Models/productModel")
const fs = require("fs")

export default async function handler(req, res) {


    try {
        if (req.method === "POST") {
            // const { title, about, application, category } = req.body;
            // console.log(req.body, "req.body")
            let productToAdd = await Product.create({
                product_title: req.body.product_title,
                about: req.body.about,
                application: req.body.application,
                image: req.file?.path,
                category: req.body.category,
                capacity: req.body.capacity,
                head: req.body.head,
                temperature: req.body.temperature,
                motor_rating: req.body.motor_rating,
                tank_capacity: req.body.tank_capacity

            });
            if (!productToAdd) {
                return res.status(400).json({ error: "Something went wrong" })
            }
            res.send(productToAdd)

        } else if (req.method === "GET") {
            if (req.query.category) {
                let categoryId = req.query.category;
                let products = await Product.find({ category: categoryId })
                return res.send(products);
            } else if (req.query.product) {
                let productId = req.query.product;
                let product = await Product.findById(productId);
                if (!product) {
                    return res.status(404).json({ error: "Product not found" })
                }
                return res.send(product);
            } else {

                let products = await Product.find().populate("category")

                res.send(products);
            }

        }
        else if (req.method == "PATCH") {
            let productToUpdate = await Product.findByIdAndUpdate(req.query.id, {
                product_title: req.body.product_title,
                about: req.body.about,
                application: req.body.application,
                category: req.body.category,
            }, { new: true })
            if (!productToUpdate) {
                return res.status(400).json({ error: "Something went wrong" })
            }
            res.send(productToUpdate)
        }
        else if (req.method == "DELETE") {
            let deleteProduct = await Product.findByIdAndDelete(req.query.id)
            try {
                // fs.unlink(`public/${deleteProduct.image}`)
                fs.unlink(`/assets/uploads/1719383939466_earth.jpg`)
            } catch (error) {
                console.log(error.message)
            }
            if (!deleteProduct) {
                return res.status(400).json({ error: "Something went wrong." })
            }
            res.send({ message: "Product deleted successfully" })
        }
        else {
            res.status(405).json({ error: "Method not allowed" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}