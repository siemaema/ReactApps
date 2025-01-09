import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Endpoint rejestracji
router.post("/register", registerUser);

// Endpoint logowania
router.post("/login", loginUser);

export default router;
