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

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Użytkownik nie znaleziony." });
      }

      next();
    } catch (error) {
      console.error("Błąd autoryzacji:", error);
      res.status(401).json({ message: "Nieautoryzowany." });
    }
  } else {
    res.status(401).json({ message: "Brak tokena autoryzacyjnego." });
  }
};
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Brak uprawnień administratora." });
  }
};
