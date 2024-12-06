/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

function Modal({ isOpen, onClose, content }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleNavigate = () => {
    navigate(`/product/${content.id}`, { state: content }); // Poprawiona ścieżka
    onClose(); // Opcjonalne zamknięcie modala po nawigacji
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1050]"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-3/4 relative z-[1060]"
        onClick={(e) => e.stopPropagation()} // Zatrzymuje propagację kliknięcia, aby nie zamykać modala
      >
        <div className="grid grid-cols-2">
          <span className="px-3">
            <h2 className="text-xl font-bold mb-4 text-center">
              {content.title || "Tytuł produktu"}
            </h2>
            <p>{content.content || "Opis produktu"}</p>
            <p>{"Opis kwota itd"}</p>
          </span>
          <img
            src={content.image || "default-image.jpg"}
            alt={content.title || "Zdjęcie produktu"}
            className="w-full h-auto rounded-lg mt-4"
          />
          <button
            onClick={handleNavigate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Zobacz więcej
          </button>
        </div>
        <div className="flex justify-end mt-4"></div>
      </div>
    </div>
  );
}

export default Modal;
