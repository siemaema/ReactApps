import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

function NavBar() {
  const { loggedIn, logoutUser, user } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const avatarUrl = user?.image || "/fallback-avatar.jpg";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?searchQuery=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logoutUser(navigate);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md flex items-center justify-between px-2 py-2 rounded-md">
      {/* Logo */}
      <Link to="/home" className="flex items-center space-x-1">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-24 w-auto rounded-md"
          onError={(e) => (e.target.src = "/fallback-logo.png")}
        />
      </Link>

      {/* Wyszukiwarka */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-grow max-w-3xl relative mx-2"
      >
        <input
          type="search"
          placeholder="Wyszukaj produkty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-2 focus:ring-2  focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
        >
          Szukaj
        </button>
      </form>

      {/* Dropdown z avatarem */}
      <div className="relative">
        {loggedIn ? (
          <>
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-16 w-16 rounded-full border-2 border-gray-300"
              />
              <span className="hidden sm:inline-block text-sm font-medium">
                {user?.username || "Użytkownik"}
              </span>
            </button>
            {dropdownVisible && (
              <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownVisible(false);
                      navigate("/profile");
                    }}
                  >
                    Profil
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownVisible(false);
                      navigate("/orders");
                    }}
                  >
                    Historia
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Wyloguj
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Zaloguj
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Zarejestruj
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
