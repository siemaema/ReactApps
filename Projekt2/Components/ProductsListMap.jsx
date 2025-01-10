import React from "react";
import ProductsList from "./ProductsList";

const ProductsListMap = ({ products }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((item) => (
          <ProductsList content={item} key={item._id || item.id} />
        ))
      ) : (
        <p className="text-gray-500">
          Brak produktów pasujących do wyszukiwania
        </p>
      )}
    </div>
  );
};

export default ProductsListMap;
