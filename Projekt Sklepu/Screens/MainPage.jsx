import React from "react";
import Layout from "./Layout";
import ProductsListMap from "../Components/ProductsListMap";
import Content from "../Components/Content"; // Import komponentu Content
import { useAppContext } from "../Contexts/AppContext";

function MainPage() {
  const { loggedIn, filter } = useAppContext(); // Pobierz status logowania i filtr z kontekstu

  return (
    <Layout>
      <div className="w-full">
        <React.Suspense fallback={<div>Ładowanie zawartości...</div>}>
          {filter ? <ProductsListMap filter={filter} /> : <Content />}
        </React.Suspense>
      </div>
    </Layout>
  );
}

export default MainPage;
