import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

const FinalizeOrder = () => {
  const { cart, clearCart, user, setCart, fetchUserProfile } = useAppContext();
  const [deliveryMethod, setDeliveryMethod] = useState("kurier");
  const [lockerAddress, setLockerAddress] = useState(""); // Adres Paczkomatu
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  console.log(user);
  const handleOrderSubmit = async () => {
    try {
      const orderDetails = {
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalPrice,
        deliveryMethod,
      };

      if (deliveryMethod === "paczkomat" && lockerAddress) {
        orderDetails.deliveryPoint = lockerAddress;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order.");
      }

      const data = await response.json();
      alert("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert("Failed to place order. Check console for details.");
    }
  };

  const handleRemoveProduct = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== productId)
    );
  };

  const handleBackToShopping = () => {
    navigate("/products");
  };

  const renderAddressInfo = () => {
    if (!user || !user.address) {
      return (
        <p className="text-red-500">
          Brak zapisanych danych adresowych. Proszę zaktualizować profil.
        </p>
      );
    }

    const { street, houseNumber, postalCode, city } = user.address;

    if (deliveryMethod === "kurier") {
      return (
        <p>
          Adres dostawy: {street} {houseNumber}, {postalCode} {city}
        </p>
      );
    }

    if (deliveryMethod === "paczkomat") {
      return (
        <div>
          <label className="block text-sm font-semibold mb-2">
            Wprowadź adres Paczkomatu:
          </label>
          <input
            type="text"
            value={lockerAddress}
            onChange={(e) => setLockerAddress(e.target.value)}
            placeholder="Np. Paczkomat WAW123, ul. Przykładowa 1, Warszawa"
            className="w-full p-2 border rounded"
          />
        </div>
      );
    }

    if (deliveryMethod === "odbiór osobisty") {
      return (
        <p>Odbiór osobisty możliwy w naszym sklepie w godzinach 9:00-18:00.</p>
      );
    }

    return null;
  };
  useEffect(() => {
    if (!user || !user.address) {
      fetchUserProfile();
    }
  }, [user]);

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
      <div className="mb-4">{renderAddressInfo()}</div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Podsumowanie koszyka:</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2 mb-2"
            >
              <span>
                {item.product.name} ({item.quantity} x {item.product.price} zł)
              </span>
              <button
                onClick={() => handleRemoveProduct(item.product._id)}
                className="text-red-500 underline"
              >
                Usuń
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Koszyk jest pusty.</p>
        )}
      </div>
      <div className="text-lg font-bold mb-6">Suma: {totalPrice} zł</div>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleOrderSubmit}
        >
          Złóż zamówienie
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={handleBackToShopping}
        >
          Wróć do zakupów
        </button>
      </div>
    </div>
  );
};

export default FinalizeOrder;
