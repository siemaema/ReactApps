/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
