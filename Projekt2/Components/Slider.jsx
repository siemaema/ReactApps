import React, { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/AppContext";
import {
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
  CImage,
} from "@coreui/react";
import Modal from "./Modal";

const Slider = () => {
  const { fetchSliderProducts } = useAppContext();
  const [sliderProducts, setSliderProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const getSliderProducts = async () => {
      try {
        const data = await fetchSliderProducts();
        setSliderProducts(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getSliderProducts();
  }, [fetchSliderProducts]);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };
  console.log(sliderProducts);
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-lg">
      <CCarousel controls>
        {sliderProducts.map((item, index) => (
          <CCarouselItem key={index}>
            <CImage
              className="d-block w-full h-96 object-fill rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
              src={item.image || "default-image.jpg"}
              alt={item.name || "Zdjęcie"}
              loading="lazy"
              onClick={() => handleOpenModal(item)}
            />
            <CCarouselCaption className="d-md-block bg-black bg-opacity-50 text-white p-3">
              <h5>{item.name || "Brak tytułu"}</h5>
              <p>{item.description || "Brak opisu"}</p>
            </CCarouselCaption>
          </CCarouselItem>
        ))}
      </CCarousel>

      {/* Modal */}
      {selectedItem && (
        <Modal content={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Slider;
