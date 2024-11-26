import Promotion from "../components/Promotion";
import RecomendedList from "../components/RecomendedList";
import Slider from "../components/Slider";
import Layout from "./Layout";

function MainPage() {
  return (
    <div className="bg-slate-500">
      <Layout>
        <Slider />
        <Promotion />
        <RecomendedList />
      </Layout>
    </div>
  );
}

export default MainPage;
