import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CButton,
} from "@coreui/react";

function NavBar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    setLoggedIn(!loggedIn);
    navigate("/home"); // Nawigacja po wylogowaniu
  };

  return (
    <div className="rounded-lg bg-[#212631] grid grid-cols-5 items-center">
      <div className="col-span-1 flex items-center">
        <Link to="/home">
          <img
            src="/logo.png"
            className="h-24 rounded-md"
            alt="Logo sklepu"
            onError={(e) => (e.target.src = "/fallback-logo.png")}
          />
        </Link>
      </div>

      <div className="col-span-3 px-2">
        <CForm className="d-flex w-full">
          <CFormInput
            type="search"
            className="w-full"
            placeholder="Wpisz coś..."
            size="lg"
          />
          <CButton
            type="submit"
            color="success"
            variant="ghost"
            className="ml-2"
          >
            Szukaj
          </CButton>
        </CForm>
      </div>

      <div className="col-span-1 flex justify-end px-3">
        {loggedIn ? (
          <CDropdown
            variant="nav-item"
            alignment={{ xs: "start", lg: "start" }}
            direction="dropstart"
            popper={false}
          >
            <CDropdownToggle>
              <CAvatar
                src="/las.jpg"
                size="lg"
                onError={(e) => (e.target.src = "/fallback-avatar.jpg")}
              />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem component={Link} to="/payments">
                <CIcon icon={icon.cilMoney} className="me-2" />
                Płatności
              </CDropdownItem>
              <CDropdownItem component={Link} to="/basket">
                <CIcon icon={icon.cilBasket} className="me-2" />
                Koszyk
              </CDropdownItem>
              <CDropdownItem component={Link} to="/history">
                <CIcon icon={icon.cilHistory} className="me-2" />
                Historia zakupów
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem component={Link} to="/settings">
                <CIcon icon={icon.cilSettings} className="me-2" />
                Ustawienia
              </CDropdownItem>
              <CDropdownItem onClick={handleLogout}>
                <CIcon icon={icon.cilLockLocked} className="me-2" />
                Wyloguj
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        ) : (
          <button
            onClick={handleNavigate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Zaloguj
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
