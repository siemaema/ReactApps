import Product from "../models/products.js";

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

// Dodanie nowego produktu
export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Produkt dodany pomyślnie", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Nie udało się dodać produktu", error });
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

// Dodanie komentarza do produktu
export const addComment = async (req, res) => {
  const { id, text, stars, username } = req.body;

  if (!id || !text || !stars || !username) {
    return res.status(400).json({ message: "Wszystkie pola są wymagane." });
  }

  try {
    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json({ message: "Produkt nie znaleziony." });
    }

    const comment = {
      username,
      text,
      stars: Math.min(5, Math.max(1, stars)), // Ensure stars are between 1 and 5
      createdAt: new Date(),
    };

    product.comments.push(comment);
    await product.save();

    res.status(200).json({ message: "Komentarz dodany.", product });
  } catch (error) {
    console.error("Błąd dodawania komentarza:", error);
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
