/* eslint-disable no-undef */
import Products from "../models/products.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "nie udalo sie pobrac produktow" + { err } });
  }
};
