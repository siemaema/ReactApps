import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

function NavBar() {
  const { loggedIn, logoutUser, user } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const avatarUrl = user?.image || "/gowno.jpg";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?searchQuery=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logoutUser(navigate); // Przekazujemy `navigate` do funkcji wylogowania
  };
  console.log(user);
  return (
    <nav className="bg-gray-900 text-white shadow-md rounded-lg flex items-center justify-between  ">
      {/* Logo */}
      <Link to="/home" className="flex items-center">
        <img
          src="/logo.png"
          alt="Logo sklepu"
          className="h-24 rounded-md"
          onError={(e) => (e.target.src = "/fallback-logo.png")}
        />
      </Link>

      {/* Wyszukiwarka */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-grow max-w-4xl relative mx-4"
      >
        <input
          type="search"
          placeholder="Wpisz coś..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
        />
        <button
          type="submit"
          className="absolute right-2 top-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm"
        >
          Szukaj
        </button>
      </form>

      {/* Dropdown z avatarem */}
      <div className="relative mx-3">
        {loggedIn ? (
          <>
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <img
                src={avatarUrl}
                alt="gowno"
                className="h-16 w-16 rounded-full border-2 border-white"
              />
            </button>
            {dropdownVisible && (
              <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden z-50">
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
                      navigate("/history");
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
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Zaloguj
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
