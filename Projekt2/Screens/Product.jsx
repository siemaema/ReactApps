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

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const product = productFromState || products.find((p) => String(p.id) === id);

  useEffect(() => {
    if (product) {
      setComments(product.comments || []);
    }
  }, [product]);

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

  const handleAddComment = async () => {
    if (!comment.trim()) {
      alert("Komentarz nie może być pusty.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id: product.id, // Pass the product ID
            text: comment, // The comment text
            stars: rating, // The star rating
            username: user.username, // Pass the logged-in user's username
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Komentarz dodany!");
        setComments((prev) => [
          ...prev,
          {
            username: user.username,
            text: comment,
            stars: rating,
            createdAt: new Date(),
          },
        ]);
        setComment(""); // Clear the comment box
        setRating(5); // Reset the rating
      } else {
        alert(data.message || "Nie udało się dodać komentarza.");
      }
    } catch (error) {
      console.error("Błąd dodawania komentarza:", error);
      alert("Błąd dodawania komentarza.");
    }
  };

  console.log(comments);
  return (
    <Layout>
      <div className="product-page container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 rounded-lg shadow-md"
          />
          <div className="p-4 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-xl font-bold mb-4">Cena: {product.price} zł</p>
            <p className="text-md mb-4 text-gray-600">
              Ilość w magazynie:{" "}
              <span className="font-semibold">{product.quantity}</span>
            </p>

            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2 text-lg font-semibold">
                Ilość:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 p-2 border rounded-lg text-center"
                min="1"
                max={product.quantity}
              />
            </div>

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              Dodaj do koszyka
            </button>
          </div>
        </div>

        <div className="comments-section mt-8">
          <h2 className="text-2xl font-bold mb-4">Komentarze</h2>
          <div className="comments-list space-y-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className={`p-4 bg-gray-100 rounded-lg shadow-sm`}
                >
                  <p className="text-gray-800 font-semibold">
                    {comment.username}
                  </p>
                  <p className="text-gray-600">{comment.text}</p>
                  <p className="text-sm text-gray-500 flex items-center justify-between w-full">
                    <span className="flex items-center">
                      Ocena:
                      <span className="ml-3 flex">
                        {Array(comment.stars)
                          .fill(0)
                          .map((_, starIndex) => (
                            <svg
                              key={starIndex}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-yellow-500 ml-1"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 .587l3.668 7.451 8.332 1.151-6.064 5.969 1.499 8.287L12 18.896l-7.435 4.549 1.499-8.287-6.064-5.969 8.332-1.151z" />
                            </svg>
                          ))}
                      </span>
                    </span>
                    <span className="text-end">{`${new Date(
                      comment.createdAt
                    ).toLocaleDateString()}`}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                Brak komentarzy dla tego produktu.
              </p>
            )}
          </div>

          {loggedIn && (
            <div className="add-comment mt-6">
              <h3 className="text-xl font-bold mb-2">Dodaj komentarz</h3>
              <textarea
                placeholder="Wpisz swój komentarz..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
              <label className="block mt-2">
                Ocena:
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="ml-2 p-2 border rounded-lg"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={handleAddComment}
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
