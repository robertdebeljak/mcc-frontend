import React from "react";
import styled from "styled-components";

export interface TableCellProps {
  width?: string;
  minWidth?: number;
  wrap?: boolean;
  align?: "left" | "right" | "center";
}

const CustomTableCell = styled.td<TableCellProps>`
  padding: 8px;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  text-align: ${({ align }) => align};
  width: ${({ width }) => width};
`;

const TableCell: React.FC<TableCellProps> = ({children, ...props}) => {
  return (
    <CustomTableCell {...props}>
      {children}
    </CustomTableCell>
  );
};

export default TableCell;
