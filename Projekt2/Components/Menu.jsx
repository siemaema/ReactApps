import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CBadge,
  CNavGroup,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { Link } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

function Menu() {
  const { setCategory } = useAppContext(); // Używamy funkcji setCategory z kontekstu

  // Funkcja do ustawiania kategorii
  const handleCategorySelect = (category) => {
    setCategory(category); // Ustawienie kategorii w kontekście
  };

  return (
    <CSidebar
      className="border-end rounded-md h-full overflow-y-auto bg-dark text-white"
      colorScheme="dark"
    >
      <CSidebarHeader className="border-bottom bg-primary text-white">
        <CSidebarBrand className="no-underline text-center font-bold text-2xl tracking-wide">
          Menu
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <Link to="/home" className="no-underline">
          <CNavItem className="hover:bg-blue-600 text-white rounded-md py-3 px-2 transition duration-300 ease-in-out">
            <span className="flex items-center gap-3 text-lg">
              <CIcon customClassName="nav-icon" icon={icon.cilHome} />
              <span>Główna</span>
            </span>
          </CNavItem>
        </Link>
        <Link to="/shop" className="no-underline">
          <CNavItem className="hover:bg-blue-600 text-white rounded-md py-3 px-2 transition duration-300 ease-in-out">
            <span className="flex items-center gap-3 text-lg">
              <CIcon customClassName="nav-icon" icon={icon.cilApps} />
              <span>Produkty</span>
            </span>
          </CNavItem>
        </Link>
        <CNavGroup
          toggler={
            <span className="flex gap-3 text-lg">
              <CIcon customClassName="nav-icon" icon={icon.cilMenuBurger} />
              <span>Kategorie</span>
            </span>
          }
          className="text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
        >
          <Link to="/shop/categories/farby" className="no-underline">
            <CNavItem
              onClick={() => handleCategorySelect("Farby")} // Przypisanie kategorii do kontekstu
              className="hover:bg-blue-500 text-white rounded-md py-2 px-2 transition duration-300 ease-in-out"
            >
              <span className="flex items-center gap-3">
                <CIcon customClassName="nav-icon" icon={icon.cilPaint} />
                <span>Farby</span>
              </span>
            </CNavItem>
          </Link>
          <Link to="/shop/categories/lakiery" className="no-underline">
            <CNavItem
              onClick={() => handleCategorySelect("Lakiery")}
              className="hover:bg-blue-500 text-white rounded-md py-2 px-2 transition duration-300 ease-in-out"
            >
              <span className="flex items-center gap-3">
                <CIcon customClassName="nav-icon" icon={icon.cilBrush} />
                <span>Lakiery</span>
              </span>
            </CNavItem>
          </Link>
          <Link to="/shop/categories/akcesoria" className="no-underline">
            <CNavItem
              onClick={() => handleCategorySelect("Akcesoria")}
              className="hover:bg-blue-500 text-white rounded-md py-2 px-2 transition duration-300 ease-in-out"
            >
              <span className="flex items-center gap-3">
                <CIcon customClassName="nav-icon" icon={icon.cilBasket} />
                <span>Akcesoria</span>
              </span>
            </CNavItem>
          </Link>
        </CNavGroup>
      </CSidebarNav>
    </CSidebar>
  );
}

export default Menu;
