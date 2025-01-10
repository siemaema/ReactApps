import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  console.log("Struktura modułu jwt-decode:", jwtDecode);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Funkcja do dekodowania tokena i ustawienia użytkownika
  const decodeAndSetUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setLoggedIn(true);
    } catch (err) {
      console.error("Błąd podczas dekodowania tokena:", err);
      localStorage.removeItem("token");
    }
  };

  // Sprawdzanie tokena po załadowaniu aplikacji
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) decodeAndSetUser(token);
  }, []);

  // Pobieranie wszystkich produktów
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Nie udało się pobrać produktów");
    } finally {
      setLoading(false);
    }
  };

  // Pobieranie produktów do slidera
  const fetchSliderProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/slider`);
      return await response.json();
    } catch (err) {
      console.error("Nie udało się pobrać produktów slidera:", err);
      throw new Error("Nie udało się pobrać produktów slidera.");
    }
  };

  // Pobieranie najnowszych produktów
  const fetchLatestProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/latest`);
      return await response.json();
    } catch (err) {
      console.error("Nie udało się pobrać najnowszych produktów:", err);
      throw new Error("Nie udało się pobrać najnowszych produktów.");
    }
  };

  // Logowanie użytkownika
  const loginUser = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        decodeAndSetUser(data.token);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Wylogowanie użytkownika
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        user,
        products,
        fetchProducts,
        fetchSliderProducts, // Funkcja do pobierania produktów slidera
        fetchLatestProducts, // Funkcja do pobierania najnowszych produktów
        setFilter,
        filter,
        setCategory,
        category,
        setLoggedIn,
        loginUser,
        logoutUser,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
