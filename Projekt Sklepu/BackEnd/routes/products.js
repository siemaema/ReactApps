import express from "express";
import {
  getAllProducts,
  getSliderProducts,
  getLatestProducts,
  addProduct,
  deleteProduct,
  addComment,
  filterProducts,
  updateProduct,
} from "../controllers/productsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import Product from "../models/products.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/slider", getSliderProducts);
router.get("/latest", getLatestProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.post("/:productId/comment", protect, async (req, res) => {
  const { productId } = req.params;
  const { text, stars } = req.body;

  const username = req.user?.username || "Anonim";
  if (!text || !stars) {
    return res.status(400).json({ message: "Wszystkie pola są wymagane." });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produkt nie znaleziony." });
    }

    const newComment = {
      username,
      text,
      stars,
      createdAt: new Date(),
    };

    product.comments.push(newComment);
    await product.save();

    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error("Błąd dodawania komentarza:", error);
    res.status(500).json({ message: "Nie udało się dodać komentarza." });
  }
});
router.get("/:productId/comments", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produkt nie znaleziony." });
    }

    res.status(200).json({ comments: product.comments });
  } catch (error) {
    console.error("Błąd pobierania komentarzy:", error);
    res.status(500).json({ message: "Nie udało się pobrać komentarzy." });
  }
});

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
router.put("/:id", protect, admin, updateProduct);

// Usuwanie produktu
router.delete("/:id", protect, admin, deleteProduct);

// Dodawanie produktu
router.post("/", protect, admin, addProduct);

router.delete("/:id/comment/:index", protect, async (req, res) => {
  const { id, index } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produkt nie znaleziony." });
    }

    if (!product.comments[index]) {
      return res.status(404).json({ message: "Komentarz nie znaleziony." });
    }

    product.comments.splice(index, 1); // Usuwanie komentarza
    await product.save();

    res.status(200).json({
      message: "Komentarz usunięty pomyślnie.",
      comments: product.comments,
    });
  } catch (error) {
    console.error("Błąd podczas usuwania komentarza:", error);
    res.status(500).json({ message: "Nie udało się usunąć komentarza." });
  }
});

export default router;
