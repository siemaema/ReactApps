import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Połączono z MongoDB"))
  .catch((err) => console.error("Nie udało się połączyć z MongoDB", err));

// Trasy
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
