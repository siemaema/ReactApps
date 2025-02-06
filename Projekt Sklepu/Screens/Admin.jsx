import React, { useEffect, useState } from "react";
import {
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import { useAppContext } from "../Contexts/AppContext";
import ProductsList from "../Components/ProductsAccordion";
import OrderList from "../Components/OrderList";

const Admin = () => {
  const { users, products, fetchAllAdminData, loading, error, API_URL } =
    useAppContext();
  const [editedUsers, setEditedUsers] = useState({});
  const [passwords, setPasswords] = useState({});
  const [editedProducts, setEditedProducts] = useState({});
  const [newProduct, setNewProduct] = useState({});
  const [editedOrders, setEditedOrders] = useState({});
  const [currentTab, setCurrentTab] = useState("users");
  useEffect(() => {
    fetchAllAdminData();
  }, []);

  const handleUserChange = (userId, field, value) => {
    setEditedUsers((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  };

  const handlePasswordChange = (userId, value) => {
    setPasswords((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/api/users/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Błąd odpowiedzi:", error);
        throw new Error("Nie udało się usunąć zamówienia.");
      }

      alert("Zamówienie zostało usunięte.");
      fetchAllAdminData(); // Odśwież dane
    } catch (error) {
      console.error("Błąd usuwania zamówienia:", error.message);
      alert(error.message || "Nie udało się usunąć zamówienia.");
    }
  };

  const handleSaveUser = async (userId) => {
    const updatedUser = editedUsers[userId];
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zapisać zmian użytkownika.");
      }

      alert("Zapisano zmiany użytkownika.");
    } catch (error) {
      console.error("Błąd zapisu użytkownika:", error);
      alert("Błąd podczas zapisywania zmian.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Nie udało się usunąć użytkownika.");
      }

      alert("Użytkownik usunięty.");
      fetchAllAdminData();
    } catch (error) {
      console.error("Błąd usuwania użytkownika:", error);
      alert("Błąd podczas usuwania użytkownika.");
    }
  };

  const handlePasswordSave = async (userId) => {
    const newPassword = passwords[userId];
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zmienić hasła.");
      }

      alert("Hasło zmienione.");
    } catch (error) {
      console.error("Błąd zmiany hasła:", error);
      alert("Błąd podczas zmiany hasła.");
    }
  };

  // Handlery dla produktów

  // Handlery dla zamówień
  const handleOrderStatusChange = (orderId, value) => {
    setEditedOrders((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], status: value },
    }));
  };

  const handleSaveOrderStatus = async (orderId, currentStatus) => {
    const newStatus = editedOrders[orderId]?.status || currentStatus; // Pobierz nowy status

    try {
      const response = await fetch(`${API_URL}/api/users/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Nie udało się zaktualizować statusu zamówienia."
        );
      }

      alert("Status zamówienia został zaktualizowany.");
      fetchAllAdminData(); // Odśwież dane
    } catch (error) {
      console.error("Błąd aktualizacji zamówienia:", error.message);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Ładowanie danych...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Błąd: {error}</div>;
  }

  return (
    <div className="w-full h-screen mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mt-8 h-auto px-3">
        Panel Administratora
      </h1>
      <CTabs
        activeItemKey={currentTab} // Zmienna kontrolująca aktywną kartę
        onActiveTabChange={(key) => setCurrentTab(key)}
        className="w-full h-full"
      >
        <CTabList variant="pills" layout="fill" className="w-full py-5">
          <CTab itemKey="users">Użytkownicy</CTab>
          <CTab itemKey="products">Produkty</CTab>
          <CTab itemKey="orders">Zamówienia</CTab>
        </CTabList>
        <CTabContent className="h-full w-full">
          <CTabPanel className="p-4 h-full" itemKey="users">
            <h2 className="text-xl font-bold mb-4">
              Zarządzanie użytkownikami
            </h2>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nazwa użytkownika</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Rola</CTableHeaderCell>
                  <CTableHeaderCell>Akcje</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user) => (
                  <CTableRow key={user._id}>
                    <CTableDataCell>{user._id}</CTableDataCell>
                    <CTableDataCell>
                      <input
                        type="text"
                        value={editedUsers[user._id]?.username || user.username}
                        onChange={(e) =>
                          handleUserChange(user._id, "username", e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <input
                        type="email"
                        value={editedUsers[user._id]?.email || user.email}
                        onChange={(e) =>
                          handleUserChange(user._id, "email", e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <input
                        type="text"
                        value={editedUsers[user._id]?.role || user.role}
                        onChange={(e) =>
                          handleUserChange(user._id, "role", e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <button
                        onClick={() => handleSaveUser(user._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Zapisz
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Usuń
                      </button>
                      <div className="mt-2">
                        <input
                          type="password"
                          placeholder="Nowe hasło"
                          value={passwords[user._id] || ""}
                          onChange={(e) =>
                            handlePasswordChange(user._id, e.target.value)
                          }
                          className="border rounded px-2 py-1 mr-2"
                        />
                        <button
                          onClick={() => handlePasswordSave(user._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Zmień hasło
                        </button>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CTabPanel>
          {/* Produkty */}
          <CTabPanel className="p-4 h-full " itemKey="products">
            <ProductsList />
          </CTabPanel>
          {/* Zamówienia */}
          <CTabPanel className="p-4 h-full" itemKey="orders">
            <h2 className="text-xl font-bold mb-4">Zarządzanie zamówieniami</h2>
            {users.map((user) => (
              <div key={user._id} className="mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Użytkownik: {user.username} ({user.email})
                </h3>
                <OrderList
                  orders={user.orders}
                  userEmail={user.email} // Przekazanie e-maila użytkownika do OrderList
                  handleOrderStatusChange={handleOrderStatusChange}
                  handleSaveOrderStatus={handleSaveOrderStatus}
                  editedOrders={editedOrders}
                  handleDeleteOrder={(index) => handleDeleteOrder(index)}
                />
              </div>
            ))}
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default Admin;
