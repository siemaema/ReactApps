/* eslint-disable no-undef */
import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
  name: { type: String, required: true }, // Nazwa produktu
  description: { type: String, required: true }, // Opis produktu
  price: { type: Number, required: true }, // Cena produktu
  image: { type: String, required: true }, // URL do zdjęcia produktu
  category: { type: String, required: true }, // Kategoria produktu
  tags: { type: [String], default: [] }, // Tablica tagów (np. ["latest", "popular"])
  status: {
    type: String,
    enum: ["latest", "available", "out_of_stock"],
    default: "available",
  }, // Status produktu
  createdAt: { type: Date, default: Date.now }, // Data dodania
});

const Products = mongoose.model("Products", productsSchema, "Products");

export default Products;
