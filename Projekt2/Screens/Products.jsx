import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; // Dodano useLocation
import { useAppContext } from "../Contexts/AppContext";
import ProductsListMap from "../Components/ProductsListMap";
import Layout from "./Layout";
import { CSpinner, CAlert } from "@coreui/react";

const Products = () => {
  const { products, fetchProducts, loading, error, category, setCategory } =
    useAppContext();
  const { category: urlCategory } = useParams(); // Pobierz kategorię z URL
  const location = useLocation(); // Do odczytu parametrów query string

  // Pobierz `searchQuery` z query string w URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("searchQuery") || "";

  // Pobierz produkty tylko raz przy montowaniu komponentu
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // Synchronizuj kategorię z URL
  useEffect(() => {
    if (urlCategory && urlCategory !== category) {
      setCategory(urlCategory); // Ustaw kategorię w kontekście
    }
  }, [urlCategory, category, setCategory]);

  // Filtrowanie produktów na podstawie kategorii i wyszukiwanej frazy
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;

    const matchesSearchQuery = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearchQuery;
  });

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
        <ProductsListMap products={filteredProducts} />
      </div>
    </Layout>
  );
};

export default Products;
