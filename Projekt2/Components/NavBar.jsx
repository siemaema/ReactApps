import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import {
  CAvatar,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
} from "@coreui/react";

function NavBar() {
  return (
    <div className=" rounded-lg bg-[#212631]  flex items-center">
      <div className="navbar-start h-full w-5/12">
        <a className=" text-white font-semibold">
          <img src="/logo.png " className="h-24 rounded-md" />
        </a>
      </div>
      <div className="navbar-center justify-items-stretch ">
        <CForm className="d-flex w-full">
          <CFormInput
            type="search"
            className=" w-full"
            placeholder="wpisz cos"
            size="lg"
          />
          <CButton type="submit" color="success" variant="ghost">
            Wyszukaj
          </CButton>
        </CForm>
      </div>
      <div className="navbar-end relative px-2 shadow-lg w-auto contrast-150 ">
        <div className="flex gap-2 btn-group-scrollable px-4 justify-between">
          <button className="btn btn-outline">
            <CIcon icon={icon.cilMoney} size="xl" />
          </button>
          <button className="btn btn-outline">
            <CIcon icon={icon.cilBasket} size="xl" />
          </button>
          <button className="btn btn-outline">
            <CIcon icon={icon.cilHistory} size="xl" />
          </button>
        </div>
        <CDropdown
          variant="nav-item"
          alignment={{ xs: "start", lg: "start" }}
          direction="dropstart"
          popper={false}
        >
          <CDropdownToggle>
            <CAvatar src="/las.jpg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem href="#">Action</CDropdownItem>
            <CDropdownItem href="#">Another action</CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem href="#">Something else here</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
    </div>
  );
}

export default NavBar;
