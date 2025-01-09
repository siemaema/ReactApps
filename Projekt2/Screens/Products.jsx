import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Używamy useLocation do pobrania parametrów URL
import ProductsList from "../Components/ProductsList"; // Komponent do wyświetlania produktów

function Products() {
  const location = useLocation(); // Używamy useLocation, aby pobrać query string z URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pobieramy searchQuery z URL
  const searchQuery = new URLSearchParams(location.search).get("searchQuery");

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
  }, [searchQuery]); // Odświeżamy, kiedy searchQuery się zmienia

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Wyniki wyszukiwania</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((item) => <ProductsList content={item} key={item._id} />)
        ) : (
          <p>Brak produktów pasujących do wyszukiwania.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
