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

// Upload zdjęcia
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

// Rejestracja użytkownika
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

// Logowanie użytkownika
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
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Błąd logowania:", error);
    res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
};

// Aktualizacja profilu użytkownika
export const updateProfile = async (req, res) => {
  const { username, email, password, address, image } = req.body;

  try {
    const updates = { username, email, address, image };

    if (password) {
      updates.password = await bcrypt.hash(password, 12);
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony." });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Nie udało się zaktualizować profilu.", error });
  }
};

// Usuwanie użytkownika
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony." });
    }

    res.status(200).json({ message: "Użytkownik usunięty pomyślnie." });
  } catch (error) {
    console.error("Błąd usuwania użytkownika:", error);
    res.status(500).json({ message: "Nie udało się usunąć użytkownika." });
  }
};
//pobieranie profilu uzytkownika
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Wyklucz hasło
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony." });
    }
    res.status(200).json(user); // Zwraca dane użytkownika
  } catch (error) {
    console.error("Błąd pobierania profilu użytkownika:", error);
    res.status(500).json({
      message: "Nie udało się pobrać profilu użytkownika.",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // ID użytkownika
    const { username, email, password, address, image } = req.body;

    const updatedFields = { username, email, address, image };

    // Hashowanie hasła, jeśli zostało podane
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updatedFields.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(id, updatedFields, {
      new: true, // Zwraca zaktualizowany dokument
    });

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Błąd aktualizacji użytkownika:", err);
    res.status(500).json({
      message: "Nie udało się zaktualizować użytkownika.",
      error: err.message,
    });
  }
};

export const updateUserPassword = async (req, res) => {
  const { id } = req.params; // ID użytkownika z parametrów
  const { password } = req.body; // Nowe hasło

  if (!password) {
    return res.status(400).json({ message: "Hasło jest wymagane." });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony." });
    }

    // Hashowanie hasła
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json({ message: "Hasło zmienione pomyślnie." });
  } catch (error) {
    console.error("Błąd zmiany hasła:", error);
    res.status(500).json({ message: "Nie udało się zmienić hasła." });
  }
};

// Funkcje koszyka: dodawanie, aktualizacja, pobieranie, usuwanie
const modifyCart = async (req, res, operation) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    if (!user)
      return res.status(404).json({ message: "Użytkownik nie istnieje." });

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Produkt nie istnieje." });

    if (operation === "add") {
      const cartItem = user.cart.find(
        (item) => item.product.toString() === productId
      );
      if (cartItem) cartItem.quantity += quantity;
      else user.cart.push({ product: productId, quantity });
    } else if (operation === "update") {
      const item = user.cart.find(
        (item) => item.product.toString() === productId
      );
      if (!item)
        return res
          .status(404)
          .json({ message: "Produkt nie znaleziony w koszyku." });
      if (quantity > product.quantity)
        return res
          .status(400)
          .json({ message: "Nie można ustawić więcej niż dostępna ilość." });
      item.quantity = quantity;
    } else if (operation === "remove") {
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Operacja na koszyku nie powiodła się.", error });
  }
};

export const addToCart = (req, res) => modifyCart(req, res, "add");
export const updateCart = (req, res) => modifyCart(req, res, "update");
export const removeFromCart = (req, res) => modifyCart(req, res, "remove");

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "cart.product",
      "name price image quantity"
    );
    if (!user)
      return res.status(404).json({ message: "Użytkownik nie istnieje." });
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Nie udało się pobrać koszyka.", error });
  }
};

// Składanie zamówienia
export const placeOrder = async (req, res) => {
  const { items, totalPrice, deliveryMethod, deliveryPoint } = req.body;

  // Sprawdzanie wymaganych pól
  if (
    !items ||
    !Array.isArray(items) ||
    items.length === 0 ||
    !totalPrice ||
    !deliveryMethod
  ) {
    return res.status(400).json({ message: "Invalid order payload." });
  }

  // Walidacja: adres Paczkomatu jest wymagany przy "paczkomacie"
  if (deliveryMethod === "paczkomat" && !deliveryPoint) {
    return res.status(400).json({
      message:
        "Adres Paczkomatu jest wymagany przy wybraniu tej metody dostawy.",
    });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Tworzenie nowego zamówienia
    const order = {
      items,
      totalPrice,
      deliveryMethod,
      deliveryPoint: deliveryPoint || null, // Ustawienie adresu Paczkomatu (lub null dla innych metod)
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
