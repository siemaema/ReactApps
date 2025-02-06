import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CForm, CFormInput, CButton, CAlert } from "@coreui/react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("dodano user", formData);
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Błąd serwera. Spróbuj ponownie później.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        {/* Error Alert */}
        {error && (
          <CAlert color="danger" className="mb-4">
            {error}
          </CAlert>
        )}

        {/* Form */}
        <CForm onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Zarejestruj się
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Wprowadź swoje dane, aby utworzyć nowe konto.
          </p>

          {/* Username Input */}
          <CFormInput
            type="text"
            placeholder="Nazwa użytkownika"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="mb-4"
          />

          {/* Email Input */}
          <CFormInput
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mb-4"
          />

          {/* Password Input */}
          <CFormInput
            type="password"
            placeholder="Hasło"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mb-6"
          />

          {/* Submit Button */}
          <CButton
            type="submit"
            color="success"
            className="w-full py-2 text-lg font-semibold"
          >
            Zarejestruj się
          </CButton>
        </CForm>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6 mb-6">
          <div className="border-b border-gray-300 w-1/4"></div>
          <span className="mx-4 text-gray-500">lub</span>
          <div className="border-b border-gray-300 w-1/4"></div>
        </div>

        {/* Back to Login Button */}
        <CButton
          type="button"
          color="secondary"
          onClick={() => navigate("/login")}
          className="w-full py-2 text-lg font-semibold mb-4"
        >
          Wróć do logowania
        </CButton>

        {/* Back to Home Button */}
        <CButton
          type="button"
          color="light"
          onClick={() => navigate("/")}
          className="w-full py-2 text-lg font-semibold"
        >
          Powrót do strony głównej
        </CButton>
      </div>
    </div>
  );
};

export default RegisterPage;
