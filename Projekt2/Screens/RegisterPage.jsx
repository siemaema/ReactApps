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
    <div className="register-page flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {error && <CAlert color="danger">{error}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6">Rejestracja</h2>
          <CFormInput
            type="text"
            placeholder="Nazwa użytkownika"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="mb-4"
          />
          <CFormInput
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mb-4"
          />
          <CFormInput
            type="password"
            placeholder="Hasło"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mb-4"
          />
          <CButton type="submit" color="success" className="w-full">
            Zarejestruj się
          </CButton>
        </CForm>
      </div>
    </div>
  );
};

export default RegisterPage;
