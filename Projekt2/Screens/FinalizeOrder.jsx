import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

const FinalizeOrder = () => {
  const { cart, clearCart } = useAppContext();
  const [deliveryMethod, setDeliveryMethod] = useState("kurier");
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  console.log(cart);
  const handleOrderSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/orders`, // Matches backend route
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            items: cart.map((item) => ({
              product: item.product._id, // Ensure `_id` matches backend schema
              quantity: item.quantity,
            })),
            totalPrice,
            deliveryMethod,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order.");
      }

      const data = await response.json();
      alert("Order placed successfully!");
      clearCart(); // Clear the cart after order placement
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  console.log("Cart State:", cart);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Finalizacja zamówienia</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Metoda dostawy:</h2>
        <select
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="kurier">Kurier</option>
          <option value="paczkomat">Paczkomat</option>
          <option value="odbiór osobisty">Odbiór osobisty</option>
        </select>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Podsumowanie koszyka:</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.product.name}</span>
              <span>
                {item.quantity} x {item.product.price} zł
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Koszyk jest pusty.</p>
        )}
      </div>
      <div className="text-lg font-bold">Suma: {totalPrice} zł</div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleOrderSubmit}
      >
        Złóż zamówienie
      </button>
    </div>
  );
};

export default FinalizeOrder;
