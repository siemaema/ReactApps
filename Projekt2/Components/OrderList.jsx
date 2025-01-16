import React, { useState } from "react";
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import { motion } from "framer-motion";

const OrderList = ({
  orders,
  userEmail, // Dodaj parametr dla e-maila użytkownika
  handleOrderStatusChange,
  handleSaveOrderStatus,
  handleDeleteOrder,
  editedOrders,
}) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <>
      {orders.map((order, index) => (
        <div
          key={order._id}
          className="mb-6 border rounded-lg shadow p-4 bg-white"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleOrderDetails(order._id)}
          >
            <h4 className="text-lg font-semibold text-gray-800">
              ID Zamówienia: {order._id}
            </h4>
            <span className="text-gray-600">
              {order.totalPrice.toFixed(2)} zł
            </span>
            <span className="text-sm text-gray-500">
              {new Date(order.date).toLocaleString()}
            </span>
          </div>
          {expandedOrder === order._id && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              className="overflow-hidden mt-4"
            >
              <div className="mb-4">
                <h5 className="text-md font-semibold text-gray-700 mb-2">
                  Szczegóły zamówienia
                </h5>
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Nazwa produktu</CTableHeaderCell>
                      <CTableHeaderCell>Ilość</CTableHeaderCell>
                      <CTableHeaderCell>Cena</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {order.items.map((item, idx) => {
                      const productName =
                        item.product?.name || "Nieznany produkt";
                      const productPrice = item.product?.price || 0;

                      return (
                        <CTableRow key={idx}>
                          <CTableDataCell>{productName}</CTableDataCell>
                          <CTableDataCell>{item.quantity}</CTableDataCell>
                          <CTableDataCell>
                            {(productPrice * item.quantity).toFixed(2)} zł
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
              </div>

              <div>
                <label
                  htmlFor={`status-${order._id}`}
                  className="font-medium text-gray-700"
                >
                  Status zamówienia:
                </label>
                <select
                  id={`status-${order._id}`}
                  value={editedOrders[order._id]?.status || order.status}
                  onChange={(e) =>
                    handleOrderStatusChange(order._id, e.target.value)
                  }
                  className="block w-full mt-2 p-2 border rounded-lg"
                >
                  <option value="Przygotowywane">Przygotowywane</option>
                  <option value="Gotowe do odbioru">Gotowe do odbioru</option>
                  <option value="Wysłane">Wysłane</option>
                </select>
                <button
                  onClick={() => handleSaveOrderStatus(order._id, order.status)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Zapisz zmiany
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Usuń zamówienie
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </>
  );
};

export default OrderList;
