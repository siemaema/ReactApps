import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Rejestracja użytkownika
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Sprawdzenie, czy użytkownik już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Użytkownik już istnieje." });
    }

    // Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tworzenie nowego użytkownika
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Zapis do kolekcji "Users"
    await newUser.save();

    // Generowanie tokena JWT
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
    // Sprawdzenie, czy użytkownik istnieje
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie istnieje." });
    }

    // Weryfikacja hasła
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Nieprawidłowe hasło." });
    }

    // Generowanie tokena JWT
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Coś poszło nie tak.", error: error.message });
  }
};
