import mongoose from "mongoose";

// Schemat zamówienia
const orderSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }, // Dodano `required: true`
      quantity: { type: Number, required: true, min: 1 }, // Minimalna ilość to 1
    },
  ],
  totalPrice: { type: Number, required: true, min: 0 }, // Minimalna wartość to 0
  deliveryMethod: {
    type: String,
    required: true,
    enum: ["kurier", "paczkomat", "odbiór osobisty"],
  }, // Przykładowe opcje dostawy
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Pole role
    address: {
      street: { type: String },
      houseNumber: { type: String },
      postalCode: { type: String },
      city: { type: String },
    },
    image: { type: String, default: "" },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    orders: [orderSchema],
  },
  { timestamps: true }
);

// Ustawienia modelu
export default mongoose.model("User", userSchema, "Users");
