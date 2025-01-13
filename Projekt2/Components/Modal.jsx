import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

function Modal({ content, onClose }) {
  const navigate = useNavigate();
  const { addToCart } = useAppContext(); // Funkcja do dodawania do koszyka

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

  const handleNavigate = () => {
    navigate(`/product/${content.id}`, { state: content });
    onClose();
  };

  const handleAddToCart = () => {
    addToCart(content, 1); // Dodanie 1 sztuki produktu do koszyka
    onClose(); // Zamknięcie modala
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
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

        <div className="text-center mt-4 flex justify-around">
          <button
            onClick={handleNavigate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Zobacz Produkt
          </button>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Dodaj do Koszyka
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
