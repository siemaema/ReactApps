import Product from "../models/products.js";
import mongoose from "mongoose";
// Pobranie wszystkich produktów
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Nie udało się pobrać produktów", error });
  }
};

// Pobranie produktów slidera
export const getSliderProducts = async (req, res) => {
  try {
    const products = await Product.find({ slider: true });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Nie udało się pobrać produktów slidera", error });
  }
};

// Pobranie najnowszych produktów
export const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find({ latest: true });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Nie udało się pobrać najnowszych produktów", error });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      category,
      image,
      slider,
      latest,
    } = req.body;

    if (!name || !description || !price || !quantity || !category || !image) {
      return res.status(400).json({ message: "Wszystkie pola są wymagane." });
    }

    // Pobierz ostatni produkt, aby znaleźć największe `id`
    const lastProduct = await Product.findOne().sort({ id: -1 });

    // Automatycznie ustaw `id` o jeden większe niż w ostatnim produkcie
    const newId = lastProduct ? parseInt(lastProduct.id, 51) + 1 : 1;

    const newProduct = new Product({
      id: newId,
      name,
      description,
      price,
      quantity,
      category,
      image,
      slider,
      latest,
    });

    await newProduct.save();
    res.status(201).json({ message: "Produkt dodany pomyślnie.", newProduct });
  } catch (error) {
    console.error("Błąd podczas dodawania produktu:", error);
    res
      .status(500)
      .json({ message: "Nie udało się dodać produktu.", error: error.message });
  }
};

// Usunięcie produktu
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produkt nie znaleziony" });
    }
    res.status(200).json({ message: "Produkt usunięty pomyślnie" });
  } catch (error) {
    res.status(500).json({ message: "Nie udało się usunąć produktu", error });
  }
};

// Pobranie konkretnego produktu na podstawie ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id }).populate(
      "comments.user",
      "username"
    );
    if (!product) {
      return res.status(404).json({ message: "Produkt nie istnieje" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Nie udało się pobrać produktu", error });
  }
};

export const addComment = async (req, res) => {
  const { text, stars } = req.body; // Tekst i ocena z żądania
  const { id } = req.params; // ID produktu z URL
  const username = req.user?.username || "Anonim"; // Nazwa użytkownika z JWT lub domyślnie "Anonim"

  if (!text || !stars) {
    return res.status(400).json({ message: "Wszystkie pola są wymagane." });
  }

  try {
    // Sprawdź, czy ID produktu jest poprawne
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Nieprawidłowe ID produktu." });
    }

    // Znajdź produkt po ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Produkt nie znaleziony." });
    }

    // Utwórz nowy komentarz
    const comment = {
      username,
      text,
      stars: Math.min(5, Math.max(1, stars)), // Ogranicz oceny do zakresu 1-5
      createdAt: new Date(),
    };

    // Dodaj komentarz do produktu
    product.comments.push(comment);
    await product.save();

    res.status(201).json({ message: "Komentarz dodany.", comment });
  } catch (error) {
    console.error("Błąd podczas dodawania komentarza:", error);
    res.status(500).json({ message: "Błąd serwera.", error });
  }
};
// Aktualizacja dostępności produktu
export const updateProductStock = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produkt nie istnieje" });
    }

    if (quantity < 0) {
      return res
        .status(400)
        .json({ message: "Nie można ustawić ujemnej ilości." });
    }

    product.quantity = quantity;
    await product.save();

    res
      .status(200)
      .json({ message: "Stan magazynowy zaktualizowany", product });
  } catch (error) {
    res.status(500).json({
      message: "Nie udało się zaktualizować stanu magazynowego.",
      error,
    });
  }
};

// Sprawdzenie dostępności produktu
export const checkProductAvailability = async (req, res) => {
  const { productId, requestedQuantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produkt nie istnieje" });
    }

    if (product.quantity < requestedQuantity) {
      return res.status(400).json({
        message: "Nie ma wystarczającej ilości produktu w magazynie.",
      });
    }

    res.status(200).json({ message: "Produkt dostępny", product });
  } catch (error) {
    res.status(500).json({
      message: "Nie udało się sprawdzić dostępności produktu.",
      error,
    });
  }
};

export const filterProducts = async (req, res) => {
  const { minPrice, maxPrice, category, manufacturer, minStars } = req.query;

  try {
    const filter = {};

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (category) {
      filter.category = category;
    }

    if (manufacturer) {
      filter.manufacturer = manufacturer; // Assumes manufacturer field exists in your product schema
    }

    if (minStars) {
      filter.$expr = {
        $gte: [
          {
            $avg: "$comments.stars",
          },
          parseFloat(minStars),
        ],
      };
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Błąd podczas filtrowania produktów.", error });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produkt nie znaleziony." });
    }

    // Aktualizacja pól
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.category = category || product.category;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Błąd aktualizacji produktu:", error);
    res.status(500).json({ message: "Nie udało się zaktualizować produktu." });
  }
};
