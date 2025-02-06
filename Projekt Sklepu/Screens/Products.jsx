import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";
import ProductsListMap from "../Components/ProductsListMap";
import Layout from "./Layout";
import { CSpinner, CAlert } from "@coreui/react";

const Products = () => {
  const { products, fetchProducts, loading, error, category, setCategory } =
    useAppContext();
  const { category: urlCategory } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get("searchQuery") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery); // Lokalny stan dla searchQuery
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  useEffect(() => {
    if (urlCategory && urlCategory !== category) {
      setCategory(urlCategory);
    }
  }, [urlCategory, category, setCategory]);

  useEffect(() => {
    // Resetuje searchQuery, gdy zmienia się `location.search`
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = category
        ? product.category.toLowerCase() === category.toLowerCase()
        : true;

      const matchesSearchQuery = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const priceMatch =
        (minPrice === "" || product.price >= parseFloat(minPrice)) &&
        (maxPrice === "" || product.price <= parseFloat(maxPrice));

      const ratingMatch =
        product.comments && product.comments.length > 0
          ? product.comments.reduce((sum, c) => sum + c.stars, 0) /
              product.comments.length >=
            minRating
          : minRating === 0;

      return matchesCategory && matchesSearchQuery && priceMatch && ratingMatch;
    })
    .sort((a, b) => {
      if (sortBy === "nameAsc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "nameDesc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "priceAsc") {
        return a.price - b.price;
      } else if (sortBy === "priceDesc") {
        return b.price - a.price;
      } else if (sortBy === "ratingDesc" || sortBy === "ratingAsc") {
        const avgRatingA =
          a.comments && a.comments.length > 0
            ? a.comments.reduce((sum, c) => sum + c.stars, 0) /
              a.comments.length
            : 0;
        const avgRatingB =
          b.comments && b.comments.length > 0
            ? b.comments.reduce((sum, c) => sum + c.stars, 0) /
              b.comments.length
            : 0;

        return sortBy === "ratingDesc"
          ? avgRatingB - avgRatingA
          : avgRatingA - avgRatingB;
      } else {
        return 0; // Brak sortowania
      }
    });

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setSortBy(""); // Reset sortowania
    setCategory(null);
    setSearchQuery(""); // Resetuje searchQuery
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CSpinner color="primary" />
      </div>
    );

  if (error) return <CAlert color="danger">{error}</CAlert>;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">
          {category
            ? `Kategoria: ${category}`
            : searchQuery
            ? `Wyniki wyszukiwania dla: "${searchQuery}"`
            : "Wszystkie produkty"}
        </h2>

        {/* Filtry */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Filtry</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {/* Min Cena */}
            <div>
              <label className="block font-semibold mb-2">
                Cena minimalna:
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="0"
              />
            </div>

            {/* Max Cena */}
            <div>
              <label className="block font-semibold mb-2">
                Cena maksymalna:
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="∞"
              />
            </div>

            {/* Min Ocena */}
            <div>
              <label className="block font-semibold mb-2">
                Minimalna ocena:
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {[0, 1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} gwiazdek
                  </option>
                ))}
              </select>
            </div>

            {/* Sortowanie */}
            <div>
              <label className="block font-semibold mb-2">Sortuj według:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Domyślnie</option>
                <option value="nameAsc">Nazwa A-Z</option>
                <option value="nameDesc">Nazwa Z-A</option>
                <option value="priceAsc">Cena rosnąco</option>
                <option value="priceDesc">Cena malejąco</option>
                <option value="ratingDesc">Ocena malejąco</option>
                <option value="ratingAsc">Ocena rosnąco</option>
              </select>
            </div>
          </div>

          {/* Resetowanie Filtrów */}
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={resetFilters}
            >
              Resetuj filtry
            </button>
          </div>
        </div>

        {/* Lista produktów */}
        <ProductsListMap products={filteredProducts} />
      </div>
    </Layout>
  );
};

export default Products;
