import { recomended } from "../data/recomended";
import RecomendedItem from "./RecomendedItem";

function RecomendedList() {
  return (
    <div className="h-auto w-full pt-8 flex flex-col items-center bg-gray-50 py-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-700 text-center">
        Polecane
      </h1>
      <div className="w-4/5 grid grid-flow-row gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4">
        {recomended.map((recom, index) => (
          <RecomendedItem recomend={recom} key={index} />
        ))}
      </div>
    </div>
  );
}

export default RecomendedList;
