import React from "react";
import styled from "styled-components";
import * as colors from "../colors";

const CustomTable = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  & tbody tr:nth-child(2n + 1) {
    background-color: ${colors.navyBlue};
  }
`;

const Table: React.FC = ({children}) => {
  return <CustomTable>{children}</CustomTable>;
};

export default Table;
