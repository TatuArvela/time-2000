import React from "react";

interface Props {
  children?: React.ReactNode;
}

const ControlGrid = ({children}: Props) =>
  (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '6px',
    }}>{children}</div>
  );

export default ControlGrid;
