import "./App.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui/dist/js/coreui.min.js";
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import JavaScript Bootstrap

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider } from "../Contexts/AppContext";
import MainPage from "../Screens/MainPage";
import LoginPage from "../Screens/LoginPage";
import RegisterPage from "../Screens/RegisterPage";
import Product from "../Screens/Product";
import Products from "../Screens/Products";
import UserProfile from "../Screens/UserProfile";
import Cart from "../Screens/Cart";
import AdminRoute from "../Components/AdminRoute";
import Admin from "../Screens/Admin";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/shop/categories/:category" element={<Products />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
