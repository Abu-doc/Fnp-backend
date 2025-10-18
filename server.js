import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://abu:Abubakar@fnpdatabase.ruvgsom.mongodb.net/fnpdb")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection Error:", err));

// 🧾 Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String
});

// ⚡ Important: Specify exact collection name from Compass
const Product = mongoose.model("Product", productSchema, "products");

// 🛍️ Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🛒 Get a single product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Start backend server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
