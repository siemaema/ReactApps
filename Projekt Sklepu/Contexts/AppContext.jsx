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
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Decode token and set user
  const decodeAndSetUser = async (token) => {
    try {
      const decoded = jwtDecode(token);

      // Sprawdzanie, czy token wygasł
      if (decoded.exp * 1000 < Date.now()) {
        logoutUser();
      } else {
        const response = await fetch(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Nie udało się pobrać szczegółów użytkownika.");
        }

        const userData = await response.json();
        setUser(userData); // Ustawienie pełnego profilu użytkownika
        setLoggedIn(true);
      }
    } catch (err) {
      console.error("Błąd podczas dekodowania tokena:", err);
      localStorage.removeItem("token");
      logoutUser();
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

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: "GET",
        headers: authHeader(),
      });

      if (!response.ok) {
        throw new Error("Nie udało się pobrać profilu użytkownika.");
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Błąd pobierania profilu:", error);
    }
  };
  const authHeader = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      decodeAndSetUser(token); // Dekodowanie tokena
      fetchUserProfile(); // Pobranie szczegółów profilu
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
      if (!product || !product._id) {
        console.error("addToCart received invalid product:", product);
        throw new Error("Invalid product data passed to addToCart.");
      }

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
        setCart(cart);
        alert(`${quantity} x ${product.name} added to cart!`);
      } else {
        alert("You need to be logged in to add products to the cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      alert(error.message || "Failed to add to cart.");
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
        setUser(data.user); // Ustawienie całego obiektu użytkownika
        setLoggedIn(true);

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

  const fetchAllAdminData = async () => {
    try {
      setLoading(true);

      const [usersResponse, productsResponse] = await Promise.all([
        fetch(`${API_URL}/api/users/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch(`${API_URL}/api/products/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      if (!usersResponse.ok || !productsResponse.ok) {
        throw new Error("Nie udało się pobrać wszystkich danych.");
      }

      const [usersData, productsData] = await Promise.all([
        usersResponse.json(),
        productsResponse.json(),
      ]);

      setUsers(usersData);
      setProducts(productsData);
    } catch (error) {
      console.error("Błąd pobierania danych administratora:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        users,
        fetchAllAdminData,
        API_URL,
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
        fetchUserProfile,

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
        authHeader,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
