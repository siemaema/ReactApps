import Latest from "./Latest";
import Slider from "./Slider";

function Content() {
  return (
    <div className="flex bg-white p-4 ml-4 rounded-lg shadow-md w-full h-auto gap-2 ">
      <div className="w-3/4">
        <Slider />
      </div>
      <div className="w-1/4 ">
        <Latest />
      </div>
    </div>
  );
}

export default Content;
