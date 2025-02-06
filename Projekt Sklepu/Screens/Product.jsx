import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";
import Layout from "./Layout";

const Product = () => {
  const { id } = useParams();
  const { products, fetchProducts, loggedIn, addToCart, user } =
    useAppContext();
  const location = useLocation();

  const productFromState = location.state;
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState([]);

  // Fetch product and comments
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const product =
    productFromState || products.find((p) => String(p._id) === id);

  const fetchComments = async () => {
    if (!product) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${product._id}/comments`
      );

      if (!response.ok) {
        throw new Error("Nie udało się pobrać komentarzy.");
      }

      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Błąd pobierania komentarzy:", error.message);
    }
  };

  useEffect(() => {
    if (product) {
      fetchComments();
    }
  }, [product]);

  const handleAddComment = async () => {
    if (!loggedIn) {
      alert("Musisz być zalogowany, aby dodać komentarz.");
      return;
    }

    if (!comment.trim()) {
      alert("Komentarz nie może być pusty.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${product._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ text: comment, stars: rating }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Nie udało się dodać komentarza.");
      }

      alert("Komentarz dodany!");
      setComment("");
      setRating(5);
      await fetchComments(); // Odświeżenie listy komentarzy
    } catch (error) {
      console.error("Błąd dodawania komentarza:", error.message);
      alert(error.message || "Błąd dodawania komentarza.");
    }
  };

  if (!product) {
    return (
      <div className="product-not-found flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">
          Produkt nie znaleziony
        </h1>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = Math.max(
      1,
      Math.min(product.quantity, Number(e.target.value))
    );
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} x ${product.name} dodano do koszyka`);
  };

  return (
    <Layout>
      <div className="product-page container mx-auto p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Product Details */}
          <div className="p-6 md:w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600 mb-4">
              Cena: {product.price} zł
            </p>
            <p className="text-md text-gray-500 mb-4">
              Ilość w magazynie:{" "}
              <span className="font-bold">{product.quantity}</span>
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="quantity" className="text-lg font-medium">
                Ilość:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 p-2 border rounded-md text-center"
                min="1"
                max={product.quantity}
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Dodaj do koszyka
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Komentarze</h2>
          <div className="comments-list space-y-6">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-100 rounded-lg shadow-md"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    {comment.username}
                  </p>
                  <p className="text-gray-600">{comment.text}</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500 font-bold">Ocena:</span>
                      <span className="ml-2 flex">
                        {Array(comment.stars)
                          .fill(null)
                          .map((_, starIndex) => (
                            <svg
                              key={starIndex}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-yellow-400 ml-1"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 .587l3.668 7.451 8.332 1.151-6.064 5.969 1.499 8.287L12 18.896l-7.435 4.549 1.499-8.287-6.064-5.969 8.332-1.151z" />
                            </svg>
                          ))}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                Brak komentarzy dla tego produktu.
              </p>
            )}
          </div>

          {/* Add Comment Section */}
          {loggedIn && (
            <div className="add-comment mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Dodaj komentarz
              </h3>
              <textarea
                placeholder="Wpisz swój komentarz..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
              ></textarea>
              <label className="block mt-4">
                Ocena:
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="ml-2 p-2 border rounded-md"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={handleAddComment}
                className="mt-4 px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition"
              >
                Dodaj komentarz
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
