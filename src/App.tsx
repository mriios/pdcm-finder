import { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ParsedData, ParsedChartData, GeneData } from "./types/global";
import Filters from "./components/HeatMap/Filters/Filters";
import parseHeatmapData from "./util/parseHeatmapData";
import HeatMap from "./components/HeatMap/HeatMap";

const App = (): JSX.Element => {
  const chartHeight = 2300;
  const [chartData, setChartData] = useState<ParsedChartData>([]);
  const [mutableChartData, setMutableChartData] = useState<ParsedChartData>([]);
  const [geneOptions, setGeneOptions] = useState<string[] | undefined>([]);
  const [diagnosisOptions, setDiagnosisOptions] = useState<
    string[] | undefined
  >([]);
  const [allValues, setAllValues] = useState<string[] | undefined>([]);

  const assignParsedData = (data: ParsedData) => {
    setChartData(data.chartData);
    setMutableChartData(data.chartData);
    setGeneOptions(data.geneOptions);
    setDiagnosisOptions(data.diagnosisOptions);
    setAllValues(data.allValues);
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

  const createChartDataCopy = useCallback(() => {
    return chartData.map((obj) => {
      return { ...obj };
    });
  }, [chartData]);

  const handleFilterChange = useCallback(
    (
      newSelectedGenes: string[],
      newSelectedDiagnosis: string[],
      newRange: string
    ) => {
      let diagnosisDataFilteredData,
        newFilteredData = createChartDataCopy();

      if (newSelectedGenes.length) {
        newFilteredData = newFilteredData.filter((gene) =>
          newSelectedGenes?.includes(gene.id)
        );
      }

      if (
        newSelectedDiagnosis.length &&
        (newRange === "100" || newRange === "0")
      ) {
        let chartGeneData, chartDataCopy;

        newFilteredData?.forEach((gene) => {
          chartDataCopy = createChartDataCopy();

          chartGeneData = chartDataCopy.find(
            (chartGene) => chartGene.id === gene.id
          ) || { data: [] };

          diagnosisDataFilteredData = chartGeneData.data.filter(
            (geneData: GeneData) =>
              newSelectedDiagnosis?.includes(geneData.diagnosis)
          );

          gene.data = diagnosisDataFilteredData;
        });
      }

      if (newRange !== "100" && newRange !== "0") {
        if (allValues?.length) {
          let chartDataCopy,
            topValueAmount,
            lowestAcceptedValue: string =
              allValues[allValues?.length - 1] || "",
            valueFilteredData,
            chartGeneData;

          // out of total amount of values, get the amount of values that fit the range
          topValueAmount = Math.floor(
            allValues?.length * (parseInt(newRange) / 100)
          );

          // mínimum value to be shown
          lowestAcceptedValue = allValues[topValueAmount];

          newFilteredData?.forEach((gene) => {
            chartDataCopy = createChartDataCopy();

            chartGeneData = chartDataCopy.find(
              (chartGene) => chartGene.id === gene.id
            ) || { data: [] };

            valueFilteredData = chartGeneData.data.filter(
              (geneData: GeneData) => {
                if (geneData.y) {
                  return geneData.y >= parseInt(lowestAcceptedValue);
                }
                return null;
              }
            );

            if (newSelectedDiagnosis.length) {
              valueFilteredData = valueFilteredData.filter(
                (geneData: GeneData) =>
                  newSelectedDiagnosis?.includes(geneData.diagnosis)
              );
            }

            gene.data = valueFilteredData;
          });
        }
      } else if (newRange === "0") {
        newFilteredData = [];
      }

      setMutableChartData(newFilteredData);
    },
    [createChartDataCopy, allValues]
  );

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
        onFilterChange={handleFilterChange}
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
                <HeatMap data={mutableChartData} height={chartHeight} />
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
