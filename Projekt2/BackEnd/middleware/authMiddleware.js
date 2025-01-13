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

      // Fetch the user and attach to req.user
      req.user = await User.findById(decoded.id).select("username email");
      if (!req.user) {
        return res.status(401).json({ message: "Nieautoryzowany dostęp." });
      }

      next();
    } catch (error) {
      console.error("Błąd z tokenem:", error);
      res.status(401).json({ message: "Nieautoryzowany dostęp." });
    }
  } else {
    res.status(401).json({ message: "Brak tokena." });
  }
};
