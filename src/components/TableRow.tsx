import React from "react";
import styled from "styled-components";

interface TableRowProps {
  onClick?(e?: any): void;
  height?: string;
}

const CustomTableRow = styled.tr`
  padding: 8px;
`;

const TableRow: React.FC<TableRowProps> = ({ children, onClick, ...props }) => {
  return (
    <CustomTableRow onClick={onClick} {...props}>
      {children}
    </CustomTableRow>
  );
};

export default TableRow;
