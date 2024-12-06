import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Połączenie z MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Połączono z MongoDB"))
  .catch((err) => console.error(`Nie udało się połączyć z MongoDB: ${err}`));

// Import routerów
import user from "./routes/user.js";
import latest from "./routes/latest.js";
import slider from "./routes/slider.js";
import products from "./routes/products.js";

// Użycie routerów
app.use("/api/users", user);
app.use("/api/latest", latest);
app.use("/api/slider", slider);
app.use("/api/products", products);
// Obsługa błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Coś poszło nie tak!" });
});

// Start serwera
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
