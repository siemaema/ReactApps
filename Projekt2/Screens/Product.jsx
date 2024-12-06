import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
function Product() {
  const location = useLocation();
  const product = location.state;
  console.log(product);
  return (
    <div className="container mx-auto p-6">
      <NavBar />
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-lg p-6">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image || product.img}
            alt={product.name || product.nazwa}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title || product.nazwa}
            </h1>
            <p className="text-gray-600 mb-6">{product.content}</p>
            <p className="text-2xl font-semibold text-green-600 mb-6">
              {product.price} zł
            </p>
          </div>
          <div>
            <button className="w-full px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200">
              Dodaj do koszyka
            </button>
          </div>
        </div>
      </div>

      {/* Sekcja opinii */}

      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        {product.reviews ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Opinie klientów
            </h2>
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-300 pb-4 mb-4">
                <p className="text-lg font-semibold text-gray-800">
                  {review.user}
                </p>
                <p className="text-yellow-500 text-xl mb-2">
                  {"⭐".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
                </p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </>
        ) : (
          "Produkt jeszcze bez opinii"
        )}
      </div>
    </div>
  );
}

export default Product;
