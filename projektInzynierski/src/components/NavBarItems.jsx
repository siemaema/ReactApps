import {
  CNavbar,
  CContainer,
  CNavItem,
  CNavLink,
  CButton,
} from "@coreui/react";

function NavBarItems() {
  return (
    <CNavbar colorScheme="dark" className="bg-dark">
      <CContainer fluid className="flex justify-between items-center">
        <div className="flex space-x-4">
          <CNavItem>
            <CNavLink
              href="#"
              className="text-white hover:text-blue-500 transition duration-200"
            >
              Płatności
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#"
              className="text-white hover:text-blue-500 transition duration-200"
            >
              Dostawa
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#"
              className="text-white hover:text-blue-500 transition duration-200"
            >
              Kontakt
            </CNavLink>
          </CNavItem>
        </div>
        <CButton
          color="primary"
          className="text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </CButton>
      </CContainer>
    </CNavbar>
  );
}

export default NavBarItems;
