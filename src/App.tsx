import HeatMap from "./components/HeatMap/HeatMap";
import data from "./data.json";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>PDCM Finder</h1>
      <h2>Heatmap</h2>
      <div style={{ height: "70vh", width: "100%" }}>
        <HeatMap data={data} />
      </div>
    </div>
  );
};

export default App;
