import { ResponsiveHeatMap } from "@nivo/heatmap";

import { ParsedData } from "../../types/global";
import CustomTooltip from "./CustomTooltip";

interface Props {
  data: ParsedData;
}

const HeatMap = (props: Props) => {
  const data = props.data,
    allValues = [];

  for (const gene of data) {
    for (const modelId of gene.data) {
      allValues.push(modelId.y);
    }
  }

  return (
    <ResponsiveHeatMap<any, Record<string, unknown>>
      data={data}
      valueFormat=" >-0.3~"
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
      tooltip={CustomTooltip}
    />
  );
};

export default HeatMap;
