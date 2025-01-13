import express from "express";
import {
  uploadImage,
  registerUser,
  loginUser,
  updateUser,
  getUserProfile,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/user.js";

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
router.post("/cart/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required." });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the product already exists in the cart
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (cartItem) {
      // Update the quantity if product exists
      cartItem.quantity += quantity;
    } else {
      // Add new product to the cart
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

// Place Order
router.post("/orders", protect, async (req, res) => {
  const { items, totalPrice, deliveryMethod } = req.body;

  if (!items || !totalPrice || !deliveryMethod) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Add the new order to the user's orders
    user.orders.push({
      items,
      totalPrice,
      deliveryMethod,
      date: new Date(),
    });

    await user.save();

    res
      .status(200)
      .json({ message: "Order placed successfully.", orders: user.orders });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order.", error });
  }
});

router.delete("/cart/clear", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.cart = []; // Clear the cart
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart.", error });
  }
});

export default router;
