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

const Admin = () => {
  const { API_URL } = useAppContext();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Pobieranie danych
  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Błąd podczas pobierania użytkowników:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Błąd podczas pobierania produktów:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Błąd podczas pobierania zamówień:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Błąd podczas usuwania użytkownika.");
      }

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Błąd podczas usuwania użytkownika:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Błąd podczas usuwania produktu.");
      }

      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Błąd podczas usuwania produktu:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Błąd podczas usuwania zamówienia.");
      }

      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Błąd podczas usuwania zamówienia:", error);
    }
  };

  return (
    <div className="w-full h-screen mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mt-8 h-auto px-3">
        Panel Administratora
      </h1>
      <CTabs activeItemKey="users" className="w-full h-full">
        {/* Zakładki (Tabs) */}
        <CTabList variant="pills" layout="fill" className="w-full py-5">
          <CTab itemKey="users">Użytkownicy</CTab>
          <CTab itemKey="products">Produkty</CTab>
          <CTab itemKey="orders">Zamówienia</CTab>
        </CTabList>

        {/* Zawartość pod zakładkami */}
        <CTabContent className="h-full w-full">
          {/* Użytkownicy */}
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
                  <CTableRow key={user.id}>
                    <CTableDataCell>{user.id}</CTableDataCell>
                    <CTableDataCell>{user.username}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.role}</CTableDataCell>
                    <CTableDataCell>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => deleteUser(user.id)}
                      >
                        Usuń
                      </button>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CTabPanel>

          {/* Produkty */}
          <CTabPanel className="p-4 h-full" itemKey="products">
            <h2 className="text-xl font-bold mb-4">Zarządzanie produktami</h2>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nazwa</CTableHeaderCell>
                  <CTableHeaderCell>Kategoria</CTableHeaderCell>
                  <CTableHeaderCell>Cena</CTableHeaderCell>
                  <CTableHeaderCell>Akcje</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((product) => (
                  <CTableRow key={product.id}>
                    <CTableDataCell>{product.id}</CTableDataCell>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.category}</CTableDataCell>
                    <CTableDataCell>{product.price} zł</CTableDataCell>
                    <CTableDataCell>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Usuń
                      </button>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CTabPanel>

          {/* Zamówienia */}
          <CTabPanel className="p-4 h-full" itemKey="orders">
            <h2 className="text-xl font-bold mb-4">Zarządzanie zamówieniami</h2>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID Zamówienia</CTableHeaderCell>
                  <CTableHeaderCell>Użytkownik</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Suma</CTableHeaderCell>
                  <CTableHeaderCell>Akcje</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders.map((order) => (
                  <CTableRow key={order.id}>
                    <CTableDataCell>{order.id}</CTableDataCell>
                    <CTableDataCell>{order.user.username}</CTableDataCell>
                    <CTableDataCell>{order.status}</CTableDataCell>
                    <CTableDataCell>{order.total} zł</CTableDataCell>
                    <CTableDataCell>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Usuń
                      </button>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default Admin;
