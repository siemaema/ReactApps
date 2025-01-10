import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

const Product = () => {
  const { id } = useParams();
  const { products } = useAppContext();
  const product = products.find((p) => p.id === id);

  if (!product) return <div>Produkt nie znaleziony</div>;

  return (
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
        </div>
      </div>
    </div>
  );
};

export default Product;
