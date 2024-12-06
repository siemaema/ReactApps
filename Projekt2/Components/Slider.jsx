import Modal from "./Modal";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Slider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Stan widoczności modala
  const [selectedItem, setSelectedItem] = useState({}); // Wybrany element slidera

  const API_URL = import.meta.env.VITE_API_URL;

  const handleNavigate = (item) => {
    navigate(`/product/${item.id}`, { state: item });
  };
  const openModal = (item) => {
    setSelectedItem(item); // Ustaw szczegóły elementu
    setIsModalOpen(true); // Otwórz modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Zamknij modal
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
        console.error("Pojawił się błąd: ", error.message);
        setError("Nie udało się załadować slidera. Spróbuj ponownie później.");
      } finally {
        setLoading(false);
      }
    };

    fetchImgs();
  }, [API_URL]);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-lg">
      <CCarousel controls>
        {data.map((item, index) => (
          <CCarouselItem key={item.id || index}>
            <CImage
              className="d-block w-full h-96 object-cover rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
              src={item.image || "default-image.jpg"}
              alt={`slide ${index + 1}`}
              loading="lazy"
              onClick={() => handleNavigate(item)} // Otwiera modal zamiast zmieniać link
            />
            <CCarouselCaption className="d-md-block bg-black bg-opacity-50 text-white p-3">
              <h5>{item.title || "Brak tytułu"}</h5>
              <p>{item.content || "Brak opisu"}</p>
              <button
                onClick={() => openModal(item)} // Otwiera modal po kliknięciu przycisku
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Zobacz więcej
              </button>
            </CCarouselCaption>
          </CCarouselItem>
        ))}
      </CCarousel>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={selectedItem} />
    </div>
  );
}

export default Slider;
