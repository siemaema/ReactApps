import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  slider: { type: Boolean, default: false },
  latest: { type: Boolean, default: false },
  quantity: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema, "Products");
export default Product;
