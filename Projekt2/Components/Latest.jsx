import { CImage, CListGroup, CListGroupItem } from "@coreui/react";
import { useState, useEffect } from "react";
import Modal from "./Modal";

function Latest() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // null na początku

  const API_URL = import.meta.env.VITE_API_URL;

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token JWT przesłany do backendu:", token);
        const response = await fetch(`${API_URL}/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, [API_URL]);

  if (loading) return <div className="text-center text-xl">Ładowanie...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="h-full my-auto">
      <h1 className="text-center text-3xl font-bold my-4">
        Ostatnio dodane produkty
      </h1>
      <CListGroup flush className="rounded-lg shadow-lg h-96 overflow-y-auto">
        {data.map((item, index) => (
          <CListGroupItem
            key={index}
            className="h-16 cursor-pointer hover:bg-gray-100 transition duration-200"
            onClick={() => openModal(item)} // Otwiera modal
          >
            <div className="flex items-center gap-4 p-2">
              <CImage
                className="w-12 h-12 object-cover rounded-full"
                src={item.image || "default-image.jpg"}
                alt={item.name || "Produkt"}
              />
              <span className="text-lg text-gray-800">
                {item.name || "Brak nazwy produktu"}
              </span>
            </div>
          </CListGroupItem>
        ))}
      </CListGroup>

      {/* Modal */}
      {selectedItem && <Modal content={selectedItem} onClose={closeModal} />}
    </div>
  );
}

export default Latest;
