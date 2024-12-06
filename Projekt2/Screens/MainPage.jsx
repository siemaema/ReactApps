import React from "react";
import Layout from "./Layout";
const Content = React.lazy(() => import("../Components/Content"));

function MainPage({ loggedIn, setLoggedIn }) {
  return (
    <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
      <React.Suspense fallback={<div>Loading content...</div>}>
        <Content />
      </React.Suspense>
    </Layout>
  );
}

export default MainPage;
