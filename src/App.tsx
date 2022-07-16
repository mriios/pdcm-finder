import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Filters from "./components/HeatMap/Filters/Filters";
import HeatMap from "./components/HeatMap/HeatMap";
import { ParsedData, ParsedChartData } from "./types/global";
import parseHeatmapData from "./util/parseHeatmapData";

const App = (): JSX.Element => {
  const chartHeight = 2300;
  const [chartData, setChartData] = useState<ParsedChartData>();
  const [geneOptions, setGeneOptions] = useState<string[] | undefined>([]);
  const [diagnosisOptions, setDiagnosisOptions] = useState<
    string[] | undefined
  >([]);

  const assignParsedData = (data: ParsedData) => {
    setChartData(data.chartData);
    setGeneOptions(data.geneOptions);
    setDiagnosisOptions(data.diagnosisOptions);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/PDCMFinder/expression-data-test/main/Expression.tsv"
      );
      const data = await response.text();

      return data;
    };
    getData().then((data) => assignParsedData(parseHeatmapData(data)));
  }, []);

  const handleGeneChange = (selectedGenes: string[]) => {
    let geneFilteredData = chartData?.filter((gene) =>
      selectedGenes.includes(gene.id)
    );
    console.log({ geneFilteredData, selectedGenes });
    setChartData(geneFilteredData);
  };

  const handleDiagnosisChange = (e: string[]) => {
    console.log(e);
  };

  const handleRangeChange = (e: string) => {
    console.log(e);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">PDCM Finder</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center">Expression data heatmap</h2>
          </Col>
        </Row>
      </Container>
      <Filters
        /*
        @ts-ignore */
        geneOptions={geneOptions}
        /*
        @ts-ignore */
        diagnosisOptions={diagnosisOptions}
        onGeneChange={handleGeneChange}
        onDiagnosisChange={handleDiagnosisChange}
        onRangeChange={handleRangeChange}
      />
      <Container>
        <Row>
          <Col>
            <div
              style={{
                height: `${chartHeight}px`,
                minWidth: "1000px", // better readibility for mobile
                marginBottom: "100px"
              }}
            >
              {chartData ? (
                <HeatMap data={chartData} height={chartHeight} />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
