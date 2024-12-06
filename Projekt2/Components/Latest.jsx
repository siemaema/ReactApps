import { CImage, CListGroup, CListGroupItem } from "@coreui/react";
import { useState, useEffect } from "react";
import Modal from "./Modal";

function Latest() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const [isModalOpen, setIsModalOpen] = useState(false); // Stan widoczności modala
  const [selectedItem, setSelectedItem] = useState({}); // Wybrany element listy

  const openModal = (item) => {
    setSelectedItem(item); // Ustaw szczegóły elementu
    setIsModalOpen(true); // Otwórz modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Zamknij modal
  };

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/latest");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Błąd przy wczytywaniu latest", error);
        setError(
          "Nie udało się załadować najnowszych produktów. Spróbuj ponownie później."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, [API_URL]);

  if (loading) {
    return <div>Ładowanie danych...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="h-full my-auto">
      <CListGroup flush className="rounded-lg shadow-lg h-96 overflow-y-auto">
        <h1 className="text-center my-2">Latest</h1>
        {data.map((item, index) => (
          <CListGroupItem
            key={index}
            className="h-14"
            onClick={() => openModal(item)}
          >
            <div className="flex items-center gap-2">
              <CImage
                className="w-10 h-10 object-cover rounded-full"
                src={item.image || "default-image.jpg"}
                alt={item.nazwa || "Produkt"}
              />
              <span>{item.nazwa || "Brak nazwy produktu"}</span>
            </div>
          </CListGroupItem>
        ))}
      </CListGroup>
      <Modal isOpen={isModalOpen} onClose={closeModal} content={selectedItem} />
    </div>
  );
}

export default Latest;
