import express from "express";
import {
  uploadImage,
  registerUser,
  loginUser,
  updateUser,
  getUserProfile,
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload zdjęcia
router.post("/upload-image", protect, uploadImage);

// Rejestracja użytkownika
router.post("/register", registerUser);

// Logowanie użytkownika
router.post("/login", loginUser);

// Aktualizacja profilu użytkownika
router.put("/update", protect, updateUser);

// Pobieranie profilu użytkownika
router.get("/profile", protect, getUserProfile);

// Dodawanie do koszyka
router.post("/cart/add", protect, addToCart);

// Pobieranie koszyka użytkownika
router.get("/cart", protect, getCart);

// Usuwanie z koszyka
router.delete("/cart/remove", protect, removeFromCart);

// Aktualizacja ilości w koszyku
router.put("/cart/update", protect, updateCart);

export default router;
