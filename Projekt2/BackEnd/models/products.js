import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Save username directly
  text: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  slider: { type: Boolean, default: false },
  latest: { type: Boolean, default: false },
  quantity: { type: Number, required: true },
  comments: [commentSchema], // Tablica komentarzy złożona z obiektów zgodnych z `commentSchema`
});

productSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const Product = mongoose.model("Product", productSchema, "Products");
  const lastProduct = await Product.findOne().sort({ id: -1 });

  this.id = lastProduct ? lastProduct.id + 1 : 1; // Generowanie kolejnego ID
  next();
});

export default mongoose.model("Product", productSchema, "Products");
