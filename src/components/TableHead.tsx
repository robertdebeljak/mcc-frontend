import React from "react";
import styled from "styled-components";

const CustomTableHead = styled.thead`
  font-size: 13px;
  border-radius: 10px;

  & td {
    font-weight: 700;
  }
`;

const TableHead: React.FC = ({ children }) => {
  return (
    <CustomTableHead>
      {children}
    </CustomTableHead>
  );
};

export default TableHead;
