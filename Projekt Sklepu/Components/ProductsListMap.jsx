import React, { useState } from "react";
import ProductsList from "./ProductsList";
import Modal from "./Modal";

const ProductsListMap = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Paginacja i wyświetlanie
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10); // Liczba produktów na stronie
  const [viewMode, setViewMode] = useState("grid"); // Widok: "grid" lub "list"

  // Obliczanie widocznych produktów na bieżącej stronie
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Liczba stron
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Funkcja otwierająca modal
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  // Funkcja zamykająca modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Funkcja obsługująca zmianę strony
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Komponent paginacji
  const renderPagination = () => (
    <div className="flex justify-center items-center my-6">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 mx-1 border rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}
    </div>
  );

  return (
    <div>
      {/* Filtry */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          {/* Widok */}
          <div>
            <label className="mr-2 font-semibold">Widok:</label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="grid">Kafelki</option>
              <option value="list">Lista</option>
            </select>
          </div>

          {/* Produkty na stronę */}
          <div>
            <label className="mr-2 font-semibold">Produkty na stronę:</label>
            <select
              value={productsPerPage}
              onChange={(e) => {
                setProductsPerPage(Number(e.target.value));
                setCurrentPage(1); // Resetuj stronę
              }}
              className="p-2 border rounded"
            >
              {[10, 25, 50, 100].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Paginacja nad listą */}
      {renderPagination()}

      {/* Lista produktów */}
      <div
        className={`${
          viewMode === "grid" ? "grid md:grid-cols-3 gap-6" : "space-y-6"
        }`}
      >
        {currentProducts.length > 0 ? (
          currentProducts.map((item) => (
            <ProductsList
              content={item}
              key={item._id || item.id}
              onOpenModal={handleOpenModal}
              viewMode={viewMode} // Przekazywanie trybu wyświetlania
            />
          ))
        ) : (
          <p className="text-gray-500">
            Brak produktów pasujących do wyszukiwania
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <Modal content={selectedProduct} onClose={handleCloseModal} />
      )}

      {/* Paginacja pod listą */}
      {renderPagination()}
    </div>
  );
};

export default ProductsListMap;
