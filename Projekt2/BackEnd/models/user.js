/* eslint-disable no-undef */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema, "Users");

export default User; // Eksport domyślny
