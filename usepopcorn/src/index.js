import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
import { useState } from "react";
const root = ReactDOM.createRoot(document.getElementById("root"));

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="red" onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating}</p>
    </div>
  );
}
root.render(
  <React.StrictMode>
    <StarRating maxRating={5} />
    <StarRating
      maxRating={5}
      color="#fa23ff"
      size={42}
      messages={[
        "twoja stara",
        "jednak nie twoja",
        "teraz to nie wiem",
        "to chyba nie ona",
        "to napewno ine ona",
      ]}
    />
    <Test />
  </React.StrictMode>
);
