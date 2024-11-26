import { CImage, CListGroup, CListGroupItem } from "@coreui/react";
import { useState, useEffect } from "react";
function Latest() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch("http://localhost:5000/latest");
        const ind = await response.json();
        setData(ind);
      } catch (err) {
        console.error("blad przy wczytywaniu latest", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading) {
    return <div>Ładowanie danych</div>;
  }
  console.log(data);
  return (
    <div className="rounded-lg h-full my-auto">
      <CListGroup flush className="rounded-lg shadow-lg h-96 overflow-y-auto">
        <h1 className="text-center my-2">Latest</h1>
        {data.map((item, index) => (
          <CListGroupItem key={index} className="h-14 ">
            <div className="flex items-center content-center h-full">
              <span>{item.data_Dodania}</span>
              <span className="flex-grow content-center text-center">
                {item.nazwa}
              </span>

              <CImage fluid src={item.img} className="size-11" />
            </div>
          </CListGroupItem>
        ))}
      </CListGroup>
    </div>
  );
}

export default Latest;
