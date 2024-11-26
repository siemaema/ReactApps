import "./App.css";
import MainPage from "./pages/MainPage";
import "@coreui/coreui/dist/css/coreui.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="lakiery" element={<p>Lakiery</p>} />
          <Route path="detailing" element={<p>detailing</p>} />
          <Route path="odstraszanie" element={<p>odstraszanie</p>} />
          <Route path="nowosci" element={<p>nowosci</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
