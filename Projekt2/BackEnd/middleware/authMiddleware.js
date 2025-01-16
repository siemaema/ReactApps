import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Pobieramy użytkownika na podstawie ID z tokena
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.error("Użytkownik nie znaleziony dla tokena:", decoded.id);
        return res
          .status(401)
          .json({ message: "Nieautoryzowany: Użytkownik nie istnieje." });
      }

      next();
    } catch (error) {
      console.error("Błąd autoryzacji:", error.name, error.message);

      if (error.name === "TokenExpiredError") {
        res
          .status(401)
          .json({ message: "Sesja wygasła. Zaloguj się ponownie." });
      } else if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Nieprawidłowy token." });
      } else {
        res.status(401).json({ message: "Nieautoryzowany." });
      }
    }
  } else {
    console.error("Brak tokena autoryzacyjnego w nagłówkach.");
    res.status(401).json({ message: "Brak tokena autoryzacyjnego." });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    console.error(
      `Brak uprawnień administratora dla użytkownika: ${
        req.user?.id || "nieznany"
      }`
    );
    res.status(403).json({ message: "Brak uprawnień administratora." });
  }
};
