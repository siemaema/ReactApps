/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
function ProductsList({ content, id }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${id}`, { state: content });
  };
  console.log(content);
  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={content.image}
        alt={content.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-bold mt-2">{content.name}</h2>
      <p className="text-sm text-gray-600">{content.description}</p>
      <p className="text-lg font-semibold mt-2">{content.price} zł</p>
      <button onClick={() => handleNavigate()}>Zobacz Więcej</button>
    </div>
  );
}

export default ProductsList;
