import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Rejestracja użytkownika
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Użytkownik już istnieje." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Rejestracja zakończona sukcesem." });
  } catch (err) {
    console.error("Błąd rejestracji:", err);
    res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
};

// Logowanie użytkownika
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Nieprawidłowy email lub hasło." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Nieprawidłowy email lub hasło." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      user: { email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    console.error("Błąd logowania:", err);
    res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
};
