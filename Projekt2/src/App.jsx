import { Suspense, lazy, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import Products from "../Screens/Products";
import LoginPage from "../Screens/LoginPage";

// Dynamic imports
const MainPage = lazy(() => import("../Screens/MainPage"));
const Product = lazy(() => import("../Screens/Product"));

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/home"
            element={<MainPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={<LoginPage setLoggedIn={setLoggedIn} />}
          />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shop" element={<Products />} />
          <Route path="*" element={<ErrorFallback />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Fallback component for 404 or other errors
function ErrorFallback() {
  return <div>404 - Page Not Found</div>;
}

export default App;
