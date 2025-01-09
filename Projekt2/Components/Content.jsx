import Latest from "./Latest";
import Slider from "./Slider";
import { useAppContext } from "../Contexts/AppContext";

function Content() {
  const { loggedIn } = useAppContext();

  return (
    <div className="flex bg-white p-4 rounded-lg shadow-md w-full h-auto gap-2">
      {/* Warunkowe klasy w zależności od statusu zalogowania */}
      <div className={loggedIn ? "w-3/4" : "w-full"}>
        <Slider />
      </div>
      {loggedIn && (
        <div className="w-1/4">
          <Latest />
        </div>
      )}
    </div>
  );
}

export default Content;
