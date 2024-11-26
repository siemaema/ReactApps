import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CBadge,
  CNavGroup,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import * as icon from "@coreui/icons";

function Menu() {
  return (
    <CSidebar
      className="border-end rounded-md h-full overflow-y-auto"
      colorScheme="dark"
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="no-underline">Menu</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Navigation</CNavTitle>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={icon.cilHome} />
          Glowna
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={icon.cilApps} /> Polecane
          <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavItem>
        <CNavGroup
          toggler={
            <>
              <CIcon
                customClassName="nav-icon"
                icon={icon.cilMenuBurger} // Ikona dla Produkty
              />{" "}
              Produkty
            </>
          }
        >
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={icon.cilHome} />
            Farby
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={icon.cilHome} />
            Lakiery
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={icon.cilHome} />
            Akcesoria
          </CNavItem>
        </CNavGroup>
      </CSidebarNav>
    </CSidebar>
  );
}

export default Menu;
