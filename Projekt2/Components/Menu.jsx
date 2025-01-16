import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavGroup,
  CBadge,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

function Menu() {
  const { setCategory, loggedIn, cart } = useAppContext(); // Używamy funkcji setCategory z kontekstu
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  // Funkcja do ustawiania kategorii i nawigacji
  const handleCategorySelect = (category, path) => {
    setCategory(category); // Ustawienie kategorii w kontekście
    navigate(path); // Navigate to the selected category path
  };
  const handleShop = () => {
    setCategory(null);
    navigate("/shop");
  };
  const badge = cart.reduce((acc, curr) => curr.quantity + acc, 0);
  console.log(cart);
  return (
    <CSidebar
      className="border-end rounded-md h-full overflow-y-auto bg-dark text-white z-0"
      colorScheme="dark"
    >
      <CSidebarHeader className="border-bottom bg-primary text-white">
        <CSidebarBrand className="no-underline text-center font-bold text-2xl tracking-wide">
          Menu
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        {/* Home Link */}
        <CNavItem>
          <button
            className="hover:bg-blue-600 text-white w-full rounded-md py-3 px-2 transition duration-300 ease-in-out"
            onClick={() => navigate("/")}
          >
            <span className="flex items-center gap-3 text-lg">
              <CIcon customClassName="nav-icon" icon={icon.cilHome} />
              <span>Główna</span>
            </span>
          </button>
        </CNavItem>

        {/* Products Link */}
        <CNavItem>
          <button
            className="hover:bg-blue-600 text-white w-full rounded-md py-3 px-2 transition duration-300 ease-in-out"
            onClick={() => handleShop()}
          >
            <span className="flex items-center gap-3 text-lg">
              <CIcon customClassName="nav-icon" icon={icon.cilApps} />
              <span>Produkty</span>
            </span>
          </button>
        </CNavItem>

        {/* Categories Dropdown */}
        <CNavGroup
          toggler={
            <span className="flex gap-3 text-lg">
              <CIcon customClassName="nav-icon" icon={icon.cilMenuBurger} />
              <span>Kategorie</span>
            </span>
          }
          className="text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
        >
          {/* Categories Links */}
          <CNavItem>
            <button
              className="hover:bg-blue-600 text-white w-full rounded-md py-3 px-2 transition duration-300 ease-in-out"
              onClick={() =>
                handleCategorySelect("Farby", "/shop/categories/farby")
              }
            >
              <span className="flex items-center gap-3">
                <CIcon customClassName="nav-icon" icon={icon.cilPaint} />
                <span>Farby</span>
              </span>
            </button>
          </CNavItem>
          <CNavItem>
            <button
              className="hover:bg-blue-500 text-white rounded-md w-full py-2 px-2 transition duration-300 ease-in-out"
              onClick={() =>
                handleCategorySelect("Lakiery", "/shop/categories/lakiery")
              }
            >
              <span className="flex items-center gap-3">
                <CIcon customClassName="nav-icon" icon={icon.cilBrush} />
                <span>Lakiery</span>
              </span>
            </button>
          </CNavItem>
          <CNavItem>
            <button
              className="hover:bg-blue-500 text-white w-full rounded-md py-2 px-2 transition duration-300 ease-in-out"
              onClick={() =>
                handleCategorySelect(
                  "Artykuły samochodowe",
                  "/shop/categories/akcesoria"
                )
              }
            >
              <span className="flex items-center gap-3">
                <CIcon customClassName="nav-icon" icon={icon.cilBasket} />
                <span>Akcesoria</span>
              </span>
            </button>
          </CNavItem>
        </CNavGroup>
        {loggedIn ? (
          <CNavItem>
            <button
              className="hover:bg-blue-500 text-white w-full rounded-md py-2 px-2 transition duration-300 ease-in-out"
              onClick={() => navigate("/cart")}
            >
              <span className="flex items-center  gap-4">
                <CIcon customClassName="nav-icon" icon={icon.cilBasket} />
                <span>Koszyk</span>
                <CBadge color="primary">{badge}</CBadge>
              </span>
            </button>
          </CNavItem>
        ) : (
          ""
        )}
      </CSidebarNav>
    </CSidebar>
  );
}

export default Menu;
