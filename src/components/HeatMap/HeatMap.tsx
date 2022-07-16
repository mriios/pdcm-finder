import { ResponsiveHeatMap } from "@nivo/heatmap";

import { ParsedChartData } from "../../types/global";
import CustomTooltip from "./CustomTooltip/CustomTooltip";

interface Props {
  data: ParsedChartData;
  height: number;
}

const HeatMap = (props: Props): JSX.Element => {
  const data = props.data,
    height = props.height,
    legendLength = 300,
    marginY = 60,
    allValues = [],
    tickFormat = " >-0.3~";

  for (const gene of data) {
    for (const modelId of gene.data) {
      allValues.push(modelId.y);
    }
  }

  return (
    <ResponsiveHeatMap<any, Record<string, unknown>>
      data={data}
      valueFormat={tickFormat}
      margin={{ top: marginY, right: 150, bottom: marginY, left: 90 }}
      tooltip={CustomTooltip}
      colors={{
        type: "sequential",
        scheme: "red_yellow_blue",
        minValue: Math.min(...(allValues as number[])),
        maxValue: Math.max(...(allValues as number[]))
      }}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 3]]
      }}
      animate={false}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: "",
        legendOffset: 46
      }}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Gene",
        legendPosition: "middle",
        legendOffset: 70
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Gene",
        legendPosition: "middle",
        legendOffset: -72
      }}
      legends={[
        {
          anchor: "right",
          translateX: 120,
          translateY: -(height / 2 - legendLength / 2) + marginY,
          length: legendLength,
          thickness: 10,
          direction: "column",
          tickPosition: "after",
          tickSize: 5,
          tickSpacing: 5,
          tickOverlap: false,
          tickFormat: tickFormat,
          title: "Z-score →",
          titleAlign: "middle",
          titleOffset: 5
        }
      ]}
    />
  );
};

export default HeatMap;
