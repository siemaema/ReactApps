import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";
import Layout from "./Layout";

const Cart = () => {
  const { loggedIn } = useAppContext();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Pobieranie zawartości koszyka
    if (loggedIn) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Nie udało się pobrać koszyka");
          }
          return res.json();
        })
        .then((data) => setCartItems(data))
        .catch((err) => console.error("Błąd pobierania koszyka:", err));
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(localCart);
    }
  }, [loggedIn]);

  // Funkcja do zmiany ilości produktu
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: Math.min(newQuantity, item.product.quantity) }
          : item
      )
    );

    if (loggedIn) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      }).catch((err) => console.error("Błąd aktualizacji koszyka:", err));
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = localCart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: Math.min(newQuantity, item.product.quantity) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Funkcja do usuwania produktu z koszyka
  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product._id !== productId)
    );

    if (loggedIn) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      }).catch((err) => console.error("Błąd usuwania z koszyka:", err));
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = localCart.filter(
        (item) => item.product._id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Obliczanie sumy całkowitej
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!loggedIn) {
      alert("Musisz się zalogować, aby sfinalizować zakup.");
      navigate("/login");
    } else {
      alert("Proces zakupu w budowie...");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Twój koszyk jest pusty</h1>
        <button
          onClick={() => navigate("/shop")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Wróć do sklepu
        </button>
      </div>
    );
  }

  return (
    <Layout>
      <div className="cart-page container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Twój koszyk</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="border rounded-lg p-4 shadow-md flex flex-col items-center"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-32 h-32 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-bold mb-2">{item.product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Cena: {item.product.price} zł
              </p>
              <div className="flex items-center mb-4">
                <label
                  htmlFor={`quantity-${item.product._id}`}
                  className="mr-2"
                >
                  Ilość:
                </label>
                <input
                  id={`quantity-${item.product._id}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.product._id,
                      parseInt(e.target.value, 10)
                    )
                  }
                  className="w-16 p-2 border rounded-lg text-center"
                  min="1"
                  max={item.product.quantity}
                />
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.product._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Usuń
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <h2 className="text-2xl font-bold">Łączna kwota: {totalPrice} zł</h2>
          <button
            onClick={handleCheckout}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Przejdź do kasy
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
