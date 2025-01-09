import Products from "../models/products.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products.length) {
      return res
        .status(404)
        .json({ message: "Nie znaleziono żadnych produktów." });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error("Błąd serwera:", err.message);
    res.status(500).json({ error: "Wewnętrzny błąd serwera." });
  }
};
