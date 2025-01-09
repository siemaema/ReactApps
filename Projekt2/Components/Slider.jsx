import Modal from "./Modal";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import { useState, useEffect } from "react";

function Slider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // null na początku

  const API_URL = import.meta.env.VITE_API_URL;

  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const fetchImgs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/slider`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Błąd: ", error.message);
        setError("Nie udało się załadować slidera.");
      } finally {
        setLoading(false);
      }
    };

    fetchImgs();
  }, [API_URL]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-lg">
      <CCarousel controls>
        {data.map((item, index) => (
          <CCarouselItem key={index}>
            <CImage
              className="d-block w-full h-96 object-cover rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
              src={item.image || "default-image.jpg"}
              alt={item.name || "Zdjęcie"}
              loading="lazy"
              onClick={() => handleOpenModal(item)} // Otwiera modal po kliknięciu
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
}

export default Slider;
