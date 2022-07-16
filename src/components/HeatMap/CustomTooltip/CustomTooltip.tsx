import "./CustomTooltip.css";

interface Cell {
  color: string;
  serieId: string;
  formattedValue: string | null;
}

interface Props {
  cell: Cell;
}

const CustomTooltip = (props: Props): JSX.Element => {
  const cell = props.cell;

  return (
    <div
      style={{
        color: cell.color
      }}
      className="custom-tooltip"
    >
      <strong>
        {cell.serieId}: {cell.formattedValue}
      </strong>
    </div>
  );
};

export default CustomTooltip;
