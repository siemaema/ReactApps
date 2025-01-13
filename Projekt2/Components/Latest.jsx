import React, { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/AppContext";
import { CCard, CCardBody, CCardImage, CCardTitle } from "@coreui/react";
import Modal from "./Modal";

const Latest = () => {
  const { fetchLatestProducts } = useAppContext();
  const [latestProducts, setLatestProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const getLatestProducts = async () => {
      try {
        const data = await fetchLatestProducts();
        setLatestProducts(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getLatestProducts();
  }, [fetchLatestProducts]);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="latest grid gap-4">
      <h3 className="font-bold text-center mt-2">Ostatnio dodane</h3>
      {latestProducts.map((product) => (
        <CCard
          key={product.id}
          className="latest-item cursor-pointer hover:shadow-lg transition-shadow duration-300"
          onClick={() => handleOpenModal(product)}
        >
          <CCardImage
            orientation="top"
            src={product.image}
            alt={product.name}
            className="h-20 object-cover"
          />
          <CCardBody>
            <CCardTitle className="text-sm font-medium text-center">
              {product.name}
            </CCardTitle>
          </CCardBody>
        </CCard>
      ))}

      {/* Modal */}
      {selectedItem && (
        <Modal content={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Latest;
