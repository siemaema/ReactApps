import mongoose from "mongoose";

// Schemat użytkownika
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Automatycznie dodaje pola createdAt i updatedAt
);

// Model użytkownika, zapisuje w kolekcji "Users"
const User = mongoose.model("User", userSchema, "Users");

export default User;
