import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";

import { useState, useEffect } from "react";

function Slider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImgs = async () => {
      try {
        const response = await fetch("http://localhost:5000/sliderData");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Pojawił się błąd ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImgs();
  }, []);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <CCarousel controls>
        {data.map((item, index) => (
          <CCarouselItem key={index}>
            <CImage
              className="d-block w-full h-96 object-cover rounded-md"
              src={item.image}
              alt={`slide ${index + 1}`}
            />
            <CCarouselCaption className="d-md-block bg-black bg-opacity-50 text-white p-3">
              <h5>{item.title}</h5>
              <p>{item.content}</p>
              <h2 className="drop-shadow-md">Nowości</h2>
            </CCarouselCaption>
          </CCarouselItem>
        ))}
      </CCarousel>
    </div>
  );
}

export default Slider;
