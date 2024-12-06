import { useState, useEffect } from "react";
import ProductsList from "./ProductsList";

function ProductsListMap() {
  const [data, setData] = useState([]); // Zmieniono na pustą tablicę
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [error, setError] = useState(null); // Stan błędów

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // Ustaw dane
      } catch (error) {
        setError(error.message); // Ustaw błąd
      } finally {
        setLoading(false); // Ustaw zakończenie ładowania
      }
    };

    fetchProducts();
  }, [API_URL]);

  if (loading) {
    return <p>Ładowanie produktów...</p>;
  }

  if (error) {
    return <p>Błąd: {error}</p>;
  }

  if (data.length === 0) {
    return <p>Brak dostępnych produktów.</p>;
  }

  return (
    <div className="grid md:grid-cols-4 gap-4 ml-3">
      {data.map((item, index) => (
        <ProductsList content={item} id={item.id} key={item._id || index} />
      ))}
    </div>
  );
}

export default ProductsListMap;
