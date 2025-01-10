import Product from "../models/products.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Nie udało się pobrać produktów", error });
  }
};

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
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Produkt dodany pomyślnie" });
  } catch (error) {
    res.status(500).json({ message: "Nie udało się dodać produktu", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findOneAndDelete({ id });
    res.status(200).json({ message: "Produkt usunięty pomyślnie" });
  } catch (error) {
    res.status(500).json({ message: "Nie udało się usunąć produktu", error });
  }
};
