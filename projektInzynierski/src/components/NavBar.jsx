import Categories from "./Categories";
import NavBarItems from "./NavBarItems";
import SearchBar from "./SearchBar";

function NavBar() {
  return (
    <div className="relative w-full">
      <div className="relative z-10 flex flex-col w-full bg-transparent backdrop-blur-md backdrop-brightness-75">
        <div className="grid pl-40 pr-40 bg-transparent">
          <NavBarItems />
          <SearchBar />
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
