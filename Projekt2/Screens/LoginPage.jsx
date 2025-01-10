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
    await loginUser(credentials);
    if (!error) {
      navigate("/");
    }
  };

  return (
    <div className="login-page flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {error && <CAlert color="danger">{error}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6">Logowanie</h2>
          <CFormInput
            type="text"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className="mb-4"
          />
          <CFormInput
            type="password"
            placeholder="Hasło"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="mb-4"
          />
          <CButton type="submit" color="primary" className="w-full">
            Zaloguj się
          </CButton>
        </CForm>
      </div>
    </div>
  );
};

export default LoginPage;
