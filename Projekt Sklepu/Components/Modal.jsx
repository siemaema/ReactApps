import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

function Modal({ content, onClose }) {
  const navigate = useNavigate();
  const { addToCart, loggedIn } = useAppContext();

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
    if (!content || !content._id) {
      console.error("Invalid product data:", content);
      alert("Cannot navigate to product details. Missing product data.");
      return;
    }
    navigate(`/product/${content._id}`, { state: content });
    onClose();
  };

  const handleAddToCart = () => {
    if (!content || !content._id) {
      console.error("Invalid product data:", content);
      alert("Cannot add to cart. Missing product data.");
      return;
    }
    addToCart(content, 1);
    onClose();
  };

  if (!content) {
    return null; // Safeguard: If no content, render nothing
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {content.name || "No Title"}
        </h2>
        <img
          src={content.image || "default-image.jpg"}
          alt={content.name || "Product Image"}
          className="w-full h-auto rounded-md mb-4"
        />
        <p className="text-gray-700 mb-6 text-center">
          {content.description || "No description available."}
        </p>
        <div className="text-center mt-4 flex justify-around">
          <button
            onClick={handleNavigate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            View Product
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!loggedIn}
            className={`px-4 py-2 rounded-lg transition ${
              loggedIn
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loggedIn ? "Add to Cart" : "Log in to add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
