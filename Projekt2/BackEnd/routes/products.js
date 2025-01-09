/* eslint-disable no-undef */
import express from "express";
import { getProducts } from "../controllers/productsController.js";

const products = express.Router();
products.get("/", getProducts);
export default products;
