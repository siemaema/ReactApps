import express from "express";
import User from "../models/user.js";
import mongoose from "mongoose";
import {
  uploadImage,
  registerUser,
  loginUser,
  updateUser,
  getUserProfile,
  getCart,
  removeFromCart,
  updateCart,
  updateUserPassword,
  deleteUser,
  updateProfile, // Dodano dedykowaną funkcję do aktualizacji profilu użytkownika
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

// Upload zdjęcia
router.post("/upload-image", protect, uploadImage);

// Rejestracja użytkownika
router.post("/register", registerUser);

// Logowanie użytkownika
router.post("/login", loginUser);

// Aktualizacja profilu użytkownika przez użytkownika
router.put("/profile", protect, updateProfile);

// Pobieranie profilu użytkownika
router.get("/profile", protect, getUserProfile);

// Dodawanie do koszyka
router.post("/cart/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    console.error("Invalid request body:", req.body);
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required." });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      console.error("User not found for ID:", req.user.id);
      return res.status(404).json({ message: "User not found." });
    }

    console.log("Adding product to cart:", productId, quantity);

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add to cart", error });
  }
});

// Pobieranie koszyka użytkownika
router.get("/cart", protect, getCart);

// Usuwanie z koszyka
router.delete("/cart/remove", protect, removeFromCart);

// Aktualizacja ilości w koszyku
router.put("/cart/update", protect, updateCart);

// Pobieranie zamówień użytkownika
router.get("/orders", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "orders.items.product"
    );

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony." });
    }

    res.status(200).json(user.orders);
  } catch (error) {
    console.error("Błąd podczas pobierania zamówień:", error);
    res.status(500).json({ message: "Nie udało się pobrać zamówień.", error });
  }
});

// Składanie zamówienia
router.post("/orders", protect, async (req, res) => {
  const { items, totalPrice, deliveryMethod, deliveryPoint } = req.body;

  // Walidacja danych wejściowych
  if (!items || !totalPrice || !deliveryMethod) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Sprawdzenie, czy `deliveryPoint` jest wymagane dla Paczkomatu
  if (deliveryMethod === "paczkomat" && !deliveryPoint) {
    return res.status(400).json({
      message: "Delivery point is required for Paczkomat delivery method.",
    });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Dodanie nowego zamówienia
    const newOrder = {
      items,
      totalPrice,
      deliveryMethod,
      deliveryPoint: deliveryMethod === "paczkomat" ? deliveryPoint : null, // Dodanie adresu Paczkomatu, jeśli wybrano metodę
      date: new Date(),
    };

    user.orders.push(newOrder);

    await user.save();

    res
      .status(200)
      .json({ message: "Order placed successfully.", orders: user.orders });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order.", error });
  }
});

// Czyszczenie koszyka
router.delete("/cart/clear", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.cart = []; // Czyszczenie koszyka
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart.", error });
  }
});

// Endpointy admina
router.get("/all", protect, admin, async (req, res) => {
  try {
    const users = await User.find().populate("orders.items.product");

    res.status(200).json(users);
  } catch (error) {
    console.error("Błąd pobierania użytkowników z zamówieniami:", error);
    res.status(500).json({ message: "Nie udało się pobrać użytkowników." });
  }
});

router.put("/:id", protect, admin, updateUser);
router.put("/:id/password", protect, admin, updateUserPassword);
router.delete("/:id", protect, admin, deleteUser);

// Aktualizacja statusu zamówienia
router.put("/orders/:id", protect, admin, async (req, res) => {
  const { id } = req.params;
  let { status } = req.body;

  // Normalizacja statusu
  const validStatuses = ["Przygotowywane", "Gotowe do odbioru", "Wysłane"];
  status = validStatuses.find((s) => s.toLowerCase() === status.toLowerCase());

  if (!status) {
    return res
      .status(400)
      .json({ message: "Nieprawidłowy status zamówienia." });
  }

  try {
    const user = await User.findOneAndUpdate(
      { "orders._id": id },
      { $set: { "orders.$.status": status } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono zamówienia." });
    }

    res
      .status(200)
      .json({ message: "Status zamówienia zaktualizowany.", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Błąd podczas aktualizacji zamówienia.", error });
  }
});

router.delete("/orders/:id", protect, admin, async (req, res) => {
  const { id } = req.params;

  try {
    // Znajdź użytkownika na podstawie _id zamówienia
    const user = await User.findOne({ "orders._id": id });

    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono zamówienia." });
    }

    // Usuń zamówienie na podstawie _id
    user.orders = user.orders.filter((order) => order._id.toString() !== id);

    // Zapisz zmiany
    await user.save();

    res.status(200).json({
      message: "Zamówienie zostało usunięte.",
      orders: user.orders,
    });
  } catch (error) {
    console.error("Błąd podczas usuwania zamówienia:", error.message);
    res.status(500).json({ message: "Błąd serwera." });
  }
});

export default router;
