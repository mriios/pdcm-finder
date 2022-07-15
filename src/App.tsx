import { useEffect, useState } from "react";

import HeatMap from "./components/HeatMap/HeatMap";
import tsvToJson from "./util/tsvToJson";

import "./App.css";

type data = {
  id: string;
  data: {
    x: string | number;
    y: number | null;
  }[];
}[];

const App = () => {
  const [data, setData] = useState<data>();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/PDCMFinder/expression-data-test/main/Expression.tsv"
      );
      const data = await response.text();

      return data;
    };
    getData().then((data) => setData(tsvToJson(data)));
  }, []);

  return (
    <div className="App">
      <h1>PDCM Finder</h1>
      <h2>Heatmap</h2>
      <div style={{ height: "90vh", width: "100%" }}>
        {data && <HeatMap data={data} />}
      </div>
    </div>
  );
};

export default App;
