import { ResponsiveHeatMap } from "@nivo/heatmap";

type Props = {
  data: {
    id: string;
    data: {
      x: string | number;
      y: number | null;
    }[];
  }[];
};

const HeatMap = (props: Props) => {
  const data = props.data;

  return <ResponsiveHeatMap data={data} />;
};

export default HeatMap;
