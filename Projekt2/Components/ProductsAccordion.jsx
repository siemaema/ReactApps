import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../Contexts/AppContext";

const ProductsList = () => {
  const { products, API_URL, fetchAllAdminData } = useAppContext();
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [editedProducts, setEditedProducts] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    image: "",
    slider: false,
    latest: false,
  });

  const handleProductChange = (productId, field, value) => {
    setEditedProducts((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], [field]: value },
    }));
  };

  const handleNewProductChange = (field, value) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProduct = async (productId) => {
    const updatedProduct = editedProducts[productId];
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zapisać zmian.");
      }

      alert("Zapisano zmiany w produkcie.");
      fetchAllAdminData();
    } catch (error) {
      console.error("Błąd zapisu:", error);
      alert("Błąd podczas zapisywania zmian.");
    }
  };

  const handleAddProduct = async () => {
    try {
      const { id, ...productData } = newProduct; // Usuń ID przed wysłaniem
      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Nie udało się dodać produktu.");
      }

      alert("Produkt dodany pomyślnie.");
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category: "",
        image: "",
        slider: false,
        latest: false,
      });
      fetchAllAdminData();
    } catch (error) {
      console.error("Błąd dodawania produktu:", error);
      alert("Błąd podczas dodawania produktu.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Nie udało się usunąć produktu.");
      }

      alert("Produkt usunięty.");
      fetchAllAdminData();
    } catch (error) {
      console.error("Błąd usuwania produktu:", error);
      alert("Błąd podczas usuwania produktu.");
    }
  };

  const toggleProductDetails = (productId) => {
    setExpandedProduct((prev) => (prev === productId ? null : productId));
  };

  const handleDeleteComment = async (productId, commentIndex) => {
    try {
      const response = await fetch(
        `${API_URL}/api/products/${productId}/comment/${commentIndex}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Nie udało się usunąć komentarza.");
      }

      alert("Komentarz usunięty pomyślnie.");
      fetchAllAdminData();
    } catch (error) {
      console.error("Błąd usuwania komentarza:", error);
      alert("Błąd podczas usuwania komentarza.");
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Zarządzanie produktami</h2>
      {/* Formularz dodawania nowego produktu */}
      <div className="mb-6 border p-4 rounded bg-gray-50 shadow">
        <h3 className="text-lg font-bold mb-4">Dodaj nowy produkt</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nazwa"
            value={newProduct.name}
            onChange={(e) => handleNewProductChange("name", e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Kategoria"
            value={newProduct.category}
            onChange={(e) => handleNewProductChange("category", e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="number"
            placeholder="Cena"
            value={newProduct.price}
            onChange={(e) =>
              handleNewProductChange("price", parseFloat(e.target.value))
            }
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="number"
            placeholder="ilosc"
            value={newProduct.quantity}
            onChange={(e) =>
              handleNewProductChange("quantity", parseInt(e.target.value, 10))
            }
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Obraz URL"
            value={newProduct.image}
            onChange={(e) => handleNewProductChange("image", e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
          <textarea
            placeholder="Opis"
            value={newProduct.description}
            onChange={(e) =>
              handleNewProductChange("description", e.target.value)
            }
            className="border rounded px-4 py-2 w-full col-span-2"
            rows="3"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newProduct.slider}
              onChange={(e) =>
                handleNewProductChange("slider", e.target.checked)
              }
            />
            <span>Dodaj do slidera</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newProduct.latest}
              onChange={(e) =>
                handleNewProductChange("latest", e.target.checked)
              }
            />
            <span>Oznacz jako najnowszy</span>
          </label>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition"
        >
          Dodaj produkt
        </button>
      </div>

      {/* Lista produktów */}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded shadow p-4 bg-white hover:shadow-md transition"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleProductDetails(product._id)}
            >
              <span className="font-bold text-lg">{product.name}</span>
              <span>{product.price.toFixed(2)} zł</span>
              <button
                className="text-red-500 underline"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Usuń
              </button>
            </div>

            {expandedProduct === product._id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                className="overflow-hidden mt-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 object-contain rounded mb-4"
                />
                <input
                  type="text"
                  value={editedProducts[product._id]?.name || product.name}
                  onChange={(e) =>
                    handleProductChange(product._id, "name", e.target.value)
                  }
                  className="border rounded px-4 py-2 w-full mb-2"
                />
                <textarea
                  value={
                    editedProducts[product._id]?.description ||
                    product.description
                  }
                  onChange={(e) =>
                    handleProductChange(
                      product._id,
                      "description",
                      e.target.value
                    )
                  }
                  className="border rounded px-4 py-2 w-full mb-2"
                  rows="3"
                />
                <input
                  type="number"
                  value={editedProducts[product._id]?.price || product.price}
                  onChange={(e) =>
                    handleProductChange(
                      product._id,
                      "price",
                      parseFloat(e.target.value)
                    )
                  }
                  className="border rounded px-4 py-2 w-full mb-2"
                />
                <input
                  type="number"
                  value={
                    editedProducts[product._id]?.quantity || product.quantity
                  }
                  onChange={(e) =>
                    handleProductChange(
                      product._id,
                      "quantity",
                      parseInt(e.target.value, 10)
                    )
                  }
                  className="border rounded px-4 py-2 w-full mb-2"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={
                      editedProducts[product._id]?.slider ?? product.slider
                    }
                    onChange={(e) =>
                      handleProductChange(
                        product._id,
                        "slider",
                        e.target.checked
                      )
                    }
                  />
                  <span>Dodaj do slidera</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={
                      editedProducts[product._id]?.latest ?? product.latest
                    }
                    onChange={(e) =>
                      handleProductChange(
                        product._id,
                        "latest",
                        e.target.checked
                      )
                    }
                  />
                  <span>Oznacz jako najnowszy</span>
                </label>
                <button
                  onClick={() => handleSaveProduct(product._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-4"
                >
                  Zapisz zmiany
                </button>

                {/* Sekcja komentarzy */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-3">Komentarze</h3>
                  {product.comments.length > 0 ? (
                    <div className="space-y-4">
                      {product.comments.map((comment, index) => (
                        <div
                          key={index}
                          className="border p-3 rounded bg-gray-50 shadow flex justify-between items-center"
                        >
                          <div>
                            <p>
                              <strong>Użytkownik:</strong> {comment.username}
                            </p>
                            <p>
                              <strong>Treść:</strong> {comment.text}
                            </p>
                            <p>
                              <strong>Data:</strong>{" "}
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteComment(product._id, index)
                            }
                            className="text-red-500 underline hover:text-red-700 transition"
                          >
                            Usuń
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Brak komentarzy dla tego produktu.</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
