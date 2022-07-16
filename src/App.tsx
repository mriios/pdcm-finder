import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ParsedData, ParsedChartData, GeneData } from "./types/global";
import Filters from "./components/HeatMap/Filters/Filters";
import parseHeatmapData from "./util/parseHeatmapData";
import HeatMap from "./components/HeatMap/HeatMap";

const App = (): JSX.Element => {
  const chartHeight = 2300;
  const [filteredData, setFilteredData] = useState<ParsedChartData>([]);
  const [chartData, setChartData] = useState<ParsedChartData>([]);
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

  const handleSelectChange = (
    newSelectedGenes: string[],
    newSelectedDiagnosis: string[]
  ) => {
    let diagnosisDataFilteredData,
      diagnosisFilteredData = [],
      newFilteredData;

    const dataToFilter = chartData.map((obj) => {
      return { ...obj };
    });

    if (newSelectedGenes.length) {
      newFilteredData = dataToFilter.filter((gene) =>
        newSelectedGenes?.includes(gene.id)
      );
    }

    if (newSelectedDiagnosis.length) {
      newFilteredData?.forEach((gene) => {
        diagnosisDataFilteredData = gene.data.filter((geneData: GeneData) =>
          newSelectedDiagnosis?.includes(geneData.diagnosis)
        );

        gene.data = diagnosisDataFilteredData;
        diagnosisFilteredData.push(gene);
      });
    }

    /*
        @ts-ignore */
    setFilteredData(newFilteredData);
  };

  const handleRangeChange = (value: string) => {
    console.log(value);
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
        /*
        @ts-ignore */
        onSelectChange={handleSelectChange}
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
                <HeatMap
                  data={filteredData.length ? filteredData : chartData}
                  height={chartHeight}
                />
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
