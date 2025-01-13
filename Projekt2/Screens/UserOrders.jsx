import React, { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/AppContext";
import Layout from "./Layout";

const Orders = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Twoje zamówienia</h1>
        {orders.map((order, index) => (
          <div key={index} className="p-4 mb-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              Zamówienie #{index + 1}
            </h2>
            <p>Data: {order.date}</p>
            <p>Metoda dostawy: {order.deliveryMethod}</p>
            <p>Łączna kwota: {order.totalPrice} zł</p>
            <h3 className="text-lg font-semibold mt-4">Przedmioty:</h3>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.product.name} - {item.quantity} szt.
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Orders;
