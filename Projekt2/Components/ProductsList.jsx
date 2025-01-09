import { useEffect, useState } from "react";
import { useAppContext } from "../Contexts/AppContext"; // Używamy kontekstu
import Modal from "./Modal";

function ProductsList({ content }) {
  const { cart, setCart } = useAppContext(); // Pobieramy stan koszyka i funkcję setCart z kontekstu
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (item) => {
    // Sprawdzamy, czy produkt już istnieje w koszyku
    const isItemInCart = cart.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      // Jeśli produkt jest już w koszyku, zwiększamy jego ilość
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Jeśli produkt nie istnieje w koszyku, dodajemy go
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (item) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Efekt, który będzie logować koszyk przy każdej zmianie
  useEffect(() => {
    console.log(cart); // To pomoże śledzić zmiany w koszyku
  }, [cart]); // Zmienna zależna - tylko kiedy `cart` się zmienia

  return (
    <div className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white grid gap-4">
      <div className="h-48 flex justify-center items-center overflow-hidden rounded-md">
        <img
          src={content.image}
          alt={content.name}
          className="object-cover w-full h-full cursor-pointer"
          onClick={() => handleOpenModal(content)} // Otwórz modal po kliknięciu na obrazek
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 overflow-hidden">
            {content.name}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 overflow-hidden">
            {content.description}
          </p>
        </div>
        <div className="grid mt-4">
          <p className="text-center text-lg font-semibold text-gray-700">
            {content.price + " zł"}
          </p>

          <button
            onClick={() => handleAddToCart(content)} // Wywołanie funkcji przy kliknięciu
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
      {selectedItem && (
        <Modal content={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default ProductsList;
