import User from "../models/user.js";
import Product from "../models/products.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";

// Konfiguracja multer do obsługi plików
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

export const uploadImage = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Nie przesłano pliku." });
      }

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { image: `/uploads/${req.file.filename}` },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Użytkownik nie znaleziony." });
      }

      res.status(200).json({ image: `/uploads/${req.file.filename}` });
    } catch (error) {
      res.status(500).json({
        message: "Błąd podczas przesyłania pliku.",
        error: error.message,
      });
    }
  },
];

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Użytkownik już istnieje." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Coś poszło nie tak.", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie istnieje." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Nieprawidłowe hasło." });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role }, // Dodano `role` do tokena
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Błąd logowania:", error);
    res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, password, address, image } = req.body;

    const updatedFields = { username, email, address, image };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updatedFields.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updatedFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Nie udało się zaktualizować użytkownika.",
      error: err.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony." });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Coś poszło nie tak.", error: error.message });
  }
};

// Funkcje dotyczące koszyka

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Produkt nie istnieje." });
    }

    if (product.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Niewystarczająca ilość produktu." });
    }

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({
      message: "Błąd podczas dodawania do koszyka.",
      error: err.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie istnieje." });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Nie udało się usunąć produktu.", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "cart.product",
      "name price image quantity"
    );

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie istnieje." });
    }

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Nie udało się pobrać koszyka.", error });
  }
};

export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie istnieje." });
    }

    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res
        .status(404)
        .json({ message: "Produkt nie znaleziony w koszyku." });
    }

    const product = await Product.findById(productId);
    if (!product || quantity > product.quantity) {
      return res
        .status(400)
        .json({ message: "Nie można ustawić więcej niż dostępna ilość." });
    }

    item.quantity = quantity;

    await user.save();

    res.status(200).json(user.cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Nie udało się zaktualizować koszyka.", error });
  }
};
export const placeOrder = async (req, res) => {
  const { items, totalPrice, deliveryMethod } = req.body;

  // Check for required fields
  if (
    !items ||
    !Array.isArray(items) ||
    items.length === 0 ||
    !totalPrice ||
    !deliveryMethod
  ) {
    return res.status(400).json({ message: "Invalid order payload." });
  }

  // Validate items
  if (items.some((item) => !item.product || !item.quantity)) {
    return res
      .status(400)
      .json({ message: "Each item must include a product and quantity." });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const order = {
      items,
      totalPrice,
      deliveryMethod,
      date: new Date(),
    };

    user.orders.push(order);
    await user.save();

    res.status(201).json({ message: "Order placed successfully.", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order.", error });
  }
};
