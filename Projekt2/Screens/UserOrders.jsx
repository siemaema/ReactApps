import React, { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/AppContext";
import Layout from "./Layout";

const UserOrders = () => {
  const { API_URL, loggedIn } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders from:", `${API_URL}/api/users/orders`);
      const response = await fetch(`${API_URL}/api/users/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Błąd odpowiedzi:", errorText);
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

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Moje Zamówienia
        </h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <ul className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <li
                key={index}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  Zamówienie #{index + 1}
                </h2>
                <p className="text-sm text-gray-600">
                  Data: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Metoda dostawy:{" "}
                  <span className="font-medium">{order.deliveryMethod}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Łączna kwota:{" "}
                  <span className="font-medium text-green-600">
                    {order.totalPrice} zł
                  </span>
                </p>
                <ul className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <li
                      key={item.product._id}
                      className="flex items-center justify-between text-sm text-gray-700"
                    >
                      <span>{item.product.name}</span>
                      <span className="font-medium text-gray-900">
                        x {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Brak zamówień do wyświetlenia.</p>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default UserOrders;
