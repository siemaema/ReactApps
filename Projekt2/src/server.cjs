const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
// Połączenie z MongoDB
mongoose
  .connect("mongodb+srv://kratiukf:Admin@baza.ad7al.mongodb.net/Project")
  .then(() => console.log("Udało się połączyć z MongoDB"))
  .catch((err) => console.log(`Nie udało się połączyć: ${err}`));

// Definicja schematu użytkownika
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const latestSchema = new mongoose.Schema({
  nazwa: String,
  data_Dodania: String,
  img: String,
});

const SliderSchema = new mongoose.Schema({
  image: String,
  title: String,
  content: String,
});

// Tworzenie modelu "User" i przypisanie go do kolekcji "users"
const User = mongoose.model("User", userSchema, "Users");

const Latest = mongoose.model("Latest", latestSchema, "Latest");

const Slider = mongoose.model("Slider", SliderSchema, "SliderData");

app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Pobranie wszystkich użytkowników
    res.status(200).json(users);
  } catch (error) {
    console.error("Błąd przy pobieraniu użytkowników:", error);
    res.status(500).json({ message: "Błąd podczas pobierania użytkowników" });
  }
});

app.get("/latest", async (req, res) => {
  try {
    const latest = await Latest.find();
    res.status(200).json(latest);
  } catch (error) {
    console.error("Blad z pobieraniem latest", error);
    res.status(500).json({ message: "Blad pobierania latest" });
  }
});

app.get("/sliderData", async (req, res) => {
  try {
    const slider = await Slider.find();
    res.status(200).json(slider);
  } catch (error) {
    console.error("Blad z pobieraniem sliderdata", error);
    res.status(500).json({ message: "Blad pobierania sliderdata" });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
