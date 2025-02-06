import Footer from "../Components/Footer";
import Menu from "../Components/Menu";
import NavBar from "../Components/NavBar";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="w-full h-full bg-slate-200 p-4 flex flex-col">
      <NavBar />
      <div className="flex flex-row mt-2 w-full">
        <div className="">
          <Menu />
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
