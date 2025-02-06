import React, { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/AppContext";
import {
  CForm,
  CFormInput,
  CButton,
  CSpinner,
  CAlert,
  CImage,
} from "@coreui/react";
import Layout from "./Layout";

const UserProfile = () => {
  const { user, logoutUser, setUser } = useAppContext();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    address: {
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
    },
    image: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setProfileData(data);
          setFormState({
            username: data.username,
            email: data.email,
            password: "",
            address: {
              street: data.address?.street || "",
              houseNumber: data.address?.houseNumber || "",
              postalCode: data.address?.postalCode || "",
              city: data.address?.city || "",
            },
            image: data?.image, // Pobieramy zdjęcie z profilu użytkownika
          });
        } else {
          throw new Error(data.message || "Nie udało się załadować profilu.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormState((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`, // Ensure this matches the backend route
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formState),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProfileData(data);
        alert("Zaktualizowano dane użytkownika.");
        // Update user context
        setUser((prevUser) => ({
          ...prevUser,
          username: data.username,
          email: data.email,
          image: data.image,
        }));
      } else {
        throw new Error(data.message || "Nie udało się zaktualizować profilu.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CSpinner color="primary" />
      </div>
    );
  if (error) return <CAlert color="danger">{error}</CAlert>;

  return (
    <Layout>
      <div className="flex bg-white p-4 rounded-lg shadow-md w-full gap-4 h-auto">
        {/* Sekcja zdjęcia użytkownika */}
        <div className="w-1/4 flex flex-col items-center justify-center">
          <CImage
            src={formState.image || "/gowno.jpg"}
            className="rounded-full shadow-md object-cover"
            width={150}
            height={150}
            alt="Avatar użytkownika"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
          <CFormInput
            type="text"
            label="Link do zdjęcia"
            name="image"
            value={formState.image || ""}
            onChange={handleInputChange}
            className="mt-3"
          />
        </div>

        {/* Sekcja informacji użytkownika */}
        <div className="w-3/4">
          <CForm>
            <CFormInput
              type="text"
              label="Nazwa użytkownika"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="email"
              label="Email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="password"
              label="Nowe hasło"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              className="mb-3"
            />
            <h4 className="text-lg font-bold mb-3">Adres kontaktowy</h4>
            <div className="grid grid-cols-2 gap-4">
              <CFormInput
                type="text"
                label="Ulica"
                name="address.street"
                value={formState.address.street}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                label="Numer domu"
                name="address.houseNumber"
                value={formState.address.houseNumber}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                label="Kod pocztowy"
                name="address.postalCode"
                value={formState.address.postalCode}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                label="Miejscowość"
                name="address.city"
                value={formState.address.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between mt-4">
              <CButton
                color="primary"
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? "Zapisywanie..." : "Zapisz zmiany"}
              </CButton>
              <CButton color="danger" onClick={logoutUser}>
                Wyloguj
              </CButton>
            </div>
          </CForm>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
