import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Trasa do rejestracji użytkownika
router.post("/register", registerUser);

// Trasa do logowania użytkownika
router.post("/login", loginUser);

export default router;
