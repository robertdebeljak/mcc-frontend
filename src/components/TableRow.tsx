import React from "react";
import styled from "styled-components";

interface TableRowProps {
  onClick?(e?: any): void;
}

const CustomTableRow = styled.tr`
  padding: 8px;
`;

const TableRow: React.FC<TableRowProps> = ({ children, onClick }) => {
  return (
    <CustomTableRow onClick={onClick}>
      {children}
    </CustomTableRow>
  );
};

export default TableRow;
