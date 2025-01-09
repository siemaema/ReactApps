import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppProvider } from "../Contexts/AppContext";

import "./App.css";
import "@coreui/coreui/dist/css/coreui.min.css";
// Importujemy strony i komponenty
import RegisterPage from "../Screens/RegisterPage";
import LoginPage from "../Screens/LoginPage";
import MainPage from "../Screens/MainPage";
import Product from "../Screens/Product";
import Products from "../Screens/Products"; // Komponent odpowiedzialny za renderowanie produktów

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shop" element={<Products />} />{" "}
          {/* Strona z produktami */}
          <Route path="/product/:id" element={<Product />} />{" "}
          {/* Strona szczegółów produktu */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<p>Nie ma takiej strony</p>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
