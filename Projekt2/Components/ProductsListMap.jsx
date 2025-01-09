import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Importujemy useLocation
import { useAppContext } from "../Contexts/AppContext";
import ProductsList from "./ProductsList"; // Komponent wyświetlający produkty

function ProductsListMap() {
  const { filter } = useAppContext(); // Pobierz filter z kontekstu
  const location = useLocation(); // Używamy useLocation do pobrania parametrów URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchQuery = new URLSearchParams(location.search).get("searchQuery"); // Pobieramy searchQuery z URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Nie udało się pobrać produktów");
        }

        // Filtrowanie produktów na podstawie searchQuery
        const filteredData = data.filter((product) =>
          searchQuery
            ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filtrowanie po nazwie
            : true
        );

        setProducts(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, filter]); // Zależy od searchQuery i filter

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid md:grid-cols-4 gap-4 ml-3">
      {products.length > 0 ? (
        products.map((item) => <ProductsList content={item} key={item._id} />)
      ) : (
        <p>Brak produktów pasujących do wyszukiwania.</p>
      )}
    </div>
  );
}

export default ProductsListMap;
