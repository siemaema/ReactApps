import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext"; // Używamy AppContext

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const { setLoggedIn, setUser } = useAppContext(); // Funkcje z AppContext
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Logowanie nie powiodło się.");
      }

      // Zapisz token w localStorage
      localStorage.setItem("token", data.token);
      // Ustaw status zalogowanego użytkownika i dane użytkownika w kontekście
      setLoggedIn(true);
      setUser(data.user);

      navigate("/home"); // Przekierowanie na stronę główną
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Zaloguj się
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Wprowadź swój email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 text-lg"
            >
              Hasło
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wprowadź swoje hasło"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Zaloguj
          </button>
        </form>

        {/* Przycisk do strony rejestracji */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">Nie masz jeszcze konta?</p>
          <button
            onClick={() => navigate("/register")} // Przekierowanie do strony rejestracji
            className="text-blue-600 hover:text-blue-700 text-lg font-semibold"
          >
            Zarejestruj się
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
