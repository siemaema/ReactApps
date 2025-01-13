import express from "express";
import {
  getAllProducts,
  getSliderProducts,
  getLatestProducts,
  addProduct,
  deleteProduct,
  addComment,
  filterProducts,
} from "../controllers/productsController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/slider", getSliderProducts);
router.get("/latest", getLatestProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.post("/comment", protect, addComment);
router.get("/filter", filterProducts);
export default router;
