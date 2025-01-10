import express from "express";
import {
  getAllProducts,
  getSliderProducts,
  getLatestProducts,
  addProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/slider", getSliderProducts);
router.get("/latest", getLatestProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

export default router;
