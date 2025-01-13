import express from "express";
import {
  getAllProducts,
  getSliderProducts,
  getLatestProducts,
  addProduct,
  deleteProduct,
  addComment,
  filterProducts,
} from "../controllers/productsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import Product from "../models/products.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/slider", getSliderProducts);
router.get("/latest", getLatestProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.post("/:id/comment", protect, addComment);
router.get("/filter", filterProducts);

router.get("/all", protect, admin, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Błąd pobierania produktów:", error);
    res.status(500).json({ message: "Nie udało się pobrać produktów." });
  }
});

export default router;
