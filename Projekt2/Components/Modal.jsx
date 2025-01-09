import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Używamy useNavigate

function Modal({ content, onClose }) {
  const navigate = useNavigate(); // Inicjalizujemy hook useNavigate

  // Zamknięcie modalnego okna klawiszem Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Funkcja do przejścia na stronę produktu
  const handleNavigate = () => {
    navigate(`/product/${content.name}`, { state: content }); // Przekierowanie na stronę produktu
    onClose(); // Zamykamy modal po kliknięciu
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Zamknięcie po kliknięciu tła
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Zapobiega zamknięciu przy kliknięciu w treść modala
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {content?.name || "Brak tytułu"}
        </h2>
        <img
          src={content?.image || "default-image.jpg"}
          alt={content?.name || "Zdjęcie produktu"}
          className="w-full h-auto rounded-md mb-4"
        />
        <p className="text-gray-700 mb-6 text-center">
          {content?.description || "Brak opisu produktu."}
        </p>

        {/* Przycisk Zamknij */}
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Zamknij
          </button>
        </div>

        {/* Przycisk Przejdź do produktu */}
        <div className="text-center mt-4">
          <button
            onClick={handleNavigate} // Przekierowanie na stronę produktu
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Zobacz Produkt
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
