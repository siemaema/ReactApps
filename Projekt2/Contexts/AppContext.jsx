import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import for JWT decoding

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State for cart
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Decode token and set user
  const decodeAndSetUser = (token) => {
    try {
      const decoded = jwtDecode(token);

      // Sprawdzanie, czy token wygasł
      if (decoded.exp * 1000 < Date.now()) {
        logoutUser(); // Tylko wylogowanie
      } else {
        setUser(decoded);
        setLoggedIn(true);
      }
    } catch (err) {
      console.error("Błąd podczas dekodowania tokena:", err);
      localStorage.removeItem("token");
      logoutUser(); // Wylogowanie w przypadku błędu
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      decodeAndSetUser(token);
    } else {
      setLoggedIn(false);
    }
  }, []);

  // Fetch user's cart
  const fetchUserCart = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart.");
      }

      const data = await response.json();
      setUser((prev) => ({ ...prev, cart: data }));
    } catch (err) {
      console.error("Error fetching cart:", err.message);
    }
  };

  // Add item to cart
  const addToCart = async (product, quantity) => {
    try {
      if (loggedIn) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/cart/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ productId: product._id, quantity }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to add to cart");
        }

        const { cart } = await response.json();
        setCart(cart); // Update cart in the context
        alert(`${quantity} x ${product.name} added to cart!`);
      } else {
        // Handle local cart for unauthenticated users
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = localCart.find(
          (item) => item.product._id === product._id
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          localCart.push({ product, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(localCart));
        setCart(localCart);
        alert(`${quantity} x ${product.name} added to cart!`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/api/users/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCart(data.cart);
    } catch (err) {
      console.error("Error removing from cart:", err.message);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (loggedIn) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/cart/clear`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to clear cart.");
        }

        setCart([]);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      localStorage.removeItem("cart");
      setCart([]);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch slider products
  const fetchSliderProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/slider`);
      return await response.json();
    } catch (err) {
      console.error("Failed to fetch slider products:", err);
      throw new Error("Failed to fetch slider products.");
    }
  };

  // Fetch latest products
  const fetchLatestProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/latest`);
      return await response.json();
    } catch (err) {
      console.error("Failed to fetch latest products:", err);
      throw new Error("Failed to fetch latest products.");
    }
  };

  // Login user
  const loginUser = async (credentials, navigate) => {
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        decodeAndSetUser(data.token); // Ustawienie użytkownika na podstawie tokena

        // Przekierowanie na podstawie roli użytkownika
        if (data.user.role === "admin") {
          navigate("/admin"); // Przekierowanie dla admina
        } else {
          navigate("/"); // Przekierowanie dla zwykłego użytkownika
        }
      } else {
        console.error("Błąd logowania:", data.message);
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Błąd logowania:", err.message);
      setError(err.message || "Nie udało się zalogować.");
    }
  };

  // Logout user
  const logoutUser = (navigate) => {
    localStorage.removeItem("token");
    setUser(null);
    setCart([]); // Clear cart
    setLoggedIn(false);
    navigate("/"); // Redirect to login
  };

  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
  };
  return (
    <AppContext.Provider
      value={{
        setCart,
        updateUserProfile,
        addToCart,
        removeFromCart,
        clearCart,
        fetchUserCart,
        loggedIn,
        user,
        setUser,
        cart, // Export cart
        products,
        fetchProducts,
        fetchSliderProducts,
        fetchLatestProducts,
        setFilter,
        filter,
        setCategory,
        category,
        setLoggedIn,
        loginUser,
        logoutUser,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
