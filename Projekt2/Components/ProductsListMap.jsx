import React, { useState } from "react";
import ProductsList from "./ProductsList";
import Modal from "./Modal";

const ProductsListMap = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Funkcja otwierająca modal
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  // Funkcja zamykająca modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((item) => (
            <ProductsList
              content={item}
              key={item._id || item.id}
              onOpenModal={handleOpenModal} // Przekazanie funkcji do ProductsList
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
    </div>
  );
};

export default ProductsListMap;
