import { useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  // Stany do zarządzania rozwijanym menu dla każdej kategorii
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  // Funkcja do obsługi najechania na przycisk
  const handleMouseEnter = (index) => {
    setOpenMenuIndex(index);
  };

  // Funkcja do obsługi opuszczenia przycisku
  const handleMouseLeave = () => {
    setOpenMenuIndex(null);
  };

  // Przykładowe dane dla podkategorii
  const categories = [
    {
      name: "Lakiery",
      subcategories: ["Bazy lakiernicze", "Podkłady", "Lakiery bezbarwne"],
      link: "/lakiery",
    },
    {
      name: "Detailing",
      subcategories: ["Woski", "Płyny do mycia", "Środki do polerowania"],
      link: "/detailing",
    },
    {
      name: "Odstraszanie Kun",
      subcategories: ["Spraye", "Elektroniczne odstraszacze", "Żele"],
      link: "/odstraszanie",
    },
    {
      name: "Nowości",
      subcategories: ["Nowe produkty", "Promocje", "Bestsellery"],
      link: "/nowosci",
    },
  ];

  return (
    <div className="grid grid-flow-col grid-cols-4 w-full py-2 gap-2">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={category.link}>
            <button className="h-20 w-full bg-gray-600 text-white drop-shadow-lg hover:bg-gray-500 duration-150 ease-in-out rounded shadow-md">
              {category.name}
            </button>
          </Link>
          {openMenuIndex === index && (
            <div className="absolute left-0 top-full  w-full bg-white shadow-lg rounded-md py-2 z-10">
              {category.subcategories.map((subcategory, subIndex) => (
                <Link
                  to={`${category.link}/${subcategory
                    .toLowerCase()
                    .replace(/ /g, "-")}`} // Link do podkategorii
                  key={subIndex}
                  className="block px-4 py-2 no-underline text-gray-800 hover:bg-gray-100"
                >
                  <p>{subcategory}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Categories;
