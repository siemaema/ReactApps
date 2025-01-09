import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAppContext } from "../Contexts/AppContext"; // Używamy AppContext do zarządzania stanem użytkownika

function NavBar() {
  const { user, setLoggedIn } = useAppContext(); // Korzystamy z AppContext do sprawdzania stanu logowania
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Przekierowanie na stronę z wynikami wyszukiwania (do komponentu Products)
      navigate(`/shop?searchQuery=${searchQuery}`);
    }
  };

  const handleLogin = () => {
    navigate("/login"); // Przekierowanie na stronę logowania
  };

  const handleLogout = () => {
    setLoggedIn(false); // Ustawienie stanu na 'wylogowany'
    navigate("/home"); // Nawigacja po wylogowaniu
  };

  return (
    <div className="rounded-lg bg-[#212631] grid grid-cols-5 items-center">
      <div className="col-span-1 flex items-center">
        <Link to="/home">
          <img
            src="/logo.png"
            className="h-24 rounded-md"
            alt="Logo sklepu"
            onError={(e) => (e.target.src = "/fallback-logo.png")}
          />
        </Link>
      </div>

      <div className="col-span-3 px-2">
        <form className="d-flex w-full" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className="w-full"
            placeholder="Wpisz coś..."
            size="lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Zmieniamy stan na podstawie wartości z input
          />
          <button type="submit" className="ml-2">
            Szukaj
          </button>
        </form>
      </div>

      <div className="col-span-1 flex justify-end px-3">
        {user ? (
          <div>
            <button onClick={handleLogout}>Wyloguj</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Zaloguj</button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
