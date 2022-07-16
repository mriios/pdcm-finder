import { GeneData } from "../../../types/global";
import "./CustomTooltip.css";

interface Cell {
  data: GeneData;
  color: string;
  serieId: string;
  formattedValue: string | null;
  id: string;
  value: number | null;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  label: string;
  borderColor: string;
  labelTextColor: string;
}

interface Props {
  cell: Cell;
}

const CustomTooltip = (props: Props): JSX.Element => {
  const cell = props.cell;
  console.log(cell);
  return (
    <div
      style={{
        color: cell.color
      }}
      className="custom-tooltip"
    >
      <strong>
        {cell.serieId}: {cell.formattedValue}
        <br />
        {cell.data.diagnosis}
      </strong>
    </div>
  );
};

export default CustomTooltip;
