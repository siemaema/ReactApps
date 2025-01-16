import React, { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/AppContext";
import Layout from "./Layout";

const UserOrders = () => {
  const { API_URL, loggedIn } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "Endpoint nie istnieje."
            : "Nie udało się pobrać zamówień."
        );
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching user orders:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchOrders();
    }
  }, [loggedIn]);

  // Funkcja do ustalenia stylów statusów
  const getStatusStyle = (status) => {
    switch (status) {
      case "Przygotowywane":
        return "text-yellow-500 bg-yellow-100";
      case "Gotowe do odbioru":
        return "text-blue-500 bg-blue-100";
      case "Wysłane":
        return "text-green-500 bg-green-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  // Komponent wyświetlający szczegóły zamówienia
  const OrderDetails = ({ order, index }) => (
    <div
      className="w-full bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
      key={index}
    >
      <div className="flex justify-between flex-col items-center mb-4">
        <h2 className="text-lg font-semibold   text-gray-800">
          Zamówienie #{index + 1}
        </h2>
        <span
          className={`px-3 py-2 rounded-full text-wrap text-sm font-medium ${getStatusStyle(
            order.status
          )}`}
        >
          {order.status}
        </span>
        <p className="text-sm pt-2 text-gray-600">
          Data: {new Date(order.date).toLocaleDateString()}{" "}
          {new Date(order.date).toLocaleTimeString()}
        </p>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        Metoda dostawy:{" "}
        <span className="font-medium text-gray-800">
          {order.deliveryMethod}
        </span>
      </p>
      {order.deliveryPoint && (
        <p className="text-sm text-gray-600 mb-2">
          Adres dostawy:{" "}
          <span className="font-medium text-gray-800">
            {order.deliveryPoint}
          </span>
        </p>
      )}
      <p className="text-sm text-gray-600 mb-4">
        Łączna kwota:{" "}
        <span className="font-bold text-green-600">{order.totalPrice} zł</span>
      </p>
      <ul className="border-t border-gray-200 pt-4">
        {order.items.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center py-2 overflow-auto text-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{item.product.name}</p>
              <p className="text-gray-600">Cena: {item.product.price} zł</p>
            </div>
            <p className="text-gray-800">x {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Moje Zamówienia
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderDetails order={order} index={index} key={index} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Brak zamówień do wyświetlenia.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders;
