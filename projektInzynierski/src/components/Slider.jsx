import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import { SliderData } from "../../../Projekt2/data/sliderData";

function Slider() {
  return (
    <div className="flex flex-col w-full h-96 bg-white ">
      <CCarousel controls>
        {SliderData.map((slide, index) => (
          <CCarouselItem key={index}>
            <CImage
              className="d-block w-full h-96 object-cover"
              src={slide.image}
              alt={`slide ${index + 1}`}
            />
            <CCarouselCaption className="d-md-block bg-black bg-opacity-50 text-white p-3">
              <h5>{slide.title}</h5>
              <p>{slide.content}</p>
              <h2 className="drop-shadow-md">Nowości</h2>
            </CCarouselCaption>
          </CCarouselItem>
        ))}
      </CCarousel>
    </div>
  );
}

export default Slider;
