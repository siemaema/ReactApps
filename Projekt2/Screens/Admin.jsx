import React, { useEffect } from "react";
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
  const {
    users = [],
    products = [],
    fetchAllAdminData,
    loading,
    error,
  } = useAppContext();

  useEffect(() => {
    fetchAllAdminData();
  }, []);

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
      <CTabs activeItemKey="users" className="w-full h-full">
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
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user) => (
                  <CTableRow key={user._id}>
                    <CTableDataCell>{user._id}</CTableDataCell>
                    <CTableDataCell>{user.username}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.role}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CTabPanel>

          <CTabPanel className="p-4 h-full" itemKey="products">
            <h2 className="text-xl font-bold mb-4">Zarządzanie produktami</h2>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nazwa</CTableHeaderCell>
                  <CTableHeaderCell>Kategoria</CTableHeaderCell>
                  <CTableHeaderCell>Cena</CTableHeaderCell>
                  <CTableHeaderCell>Ilość w magazynie</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((product) => (
                  <CTableRow key={product._id}>
                    <CTableDataCell>{product._id}</CTableDataCell>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.category}</CTableDataCell>
                    <CTableDataCell>{product.price} zł</CTableDataCell>
                    <CTableDataCell>{product.quantity}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CTabPanel>

          <CTabPanel className="p-4 h-full" itemKey="orders">
            <h2 className="text-xl font-bold mb-4">Zarządzanie zamówieniami</h2>
            {users.map((user) => (
              <div key={user._id} className="mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Użytkownik: {user.username} ({user.email})
                </h3>
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>ID Zamówienia</CTableHeaderCell>
                      <CTableHeaderCell>Suma</CTableHeaderCell>
                      <CTableHeaderCell>Data</CTableHeaderCell>
                      <CTableHeaderCell>Metoda dostawy</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {user.orders.map((order) => (
                      <CTableRow key={order._id}>
                        <CTableDataCell>{order._id}</CTableDataCell>
                        <CTableDataCell>{order.totalPrice} zł</CTableDataCell>
                        <CTableDataCell>
                          {new Date(order.date).toLocaleString()}
                        </CTableDataCell>
                        <CTableDataCell>{order.deliveryMethod}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            ))}
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default Admin;
