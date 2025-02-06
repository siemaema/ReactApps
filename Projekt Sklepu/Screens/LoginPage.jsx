import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";
import { CForm, CFormInput, CButton, CAlert } from "@coreui/react";

const LoginPage = () => {
  const { loginUser, error } = useAppContext();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(credentials, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
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
            Zaloguj się
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Wprowadź swoje dane, aby uzyskać dostęp do konta.
          </p>

          {/* Email Input */}
          <CFormInput
            type="text"
            placeholder="Wprowadź email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className="mb-4"
          />

          {/* Password Input */}
          <CFormInput
            type="password"
            placeholder="Wprowadź hasło"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="mb-6"
          />

          {/* Submit Button */}
          <CButton
            type="submit"
            color="primary"
            className="w-full py-2 text-lg font-semibold"
          >
            Zaloguj się
          </CButton>
        </CForm>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6 mb-6">
          <div className="border-b border-gray-300 w-1/4"></div>
          <span className="mx-4 text-gray-500">lub</span>
          <div className="border-b border-gray-300 w-1/4"></div>
        </div>

        {/* Register Button */}
        <CButton
          type="button"
          color="secondary"
          onClick={() => navigate("/register")}
          className="w-full py-2 text-lg font-semibold mb-4"
        >
          Zarejestruj się
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

export default LoginPage;
