import React from "react";
import Slider from "./Slider";
import Latest from "./Latest";

const Content = () => {
  return (
    <div className="content-container flex flex-row h-96 bg-white rounded-lg overflow-hidden mx-2">
      {/* Slider */}
      <div className="slider-container flex-1 h-full">
        <Slider />
      </div>

      {/* Latest Products */}
      <div className="latest-container w-1/4 h-full overflow-y-auto bg-gray-100 px-4">
        <Latest />
      </div>
    </div>
  );
};

export default Content;
