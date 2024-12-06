import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setLoggedIn }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Zmiana stanu logowania
    setLoggedIn(true);

    // Nawigacja do strony głównej
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Zaloguj się
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Wprowadź email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Hasło
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Wprowadź hasło"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Zaloguj się
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Nie masz konta?{" "}
          <a
            href="/signup"
            className="text-purple-500 font-semibold hover:underline"
          >
            Zarejestruj się
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
