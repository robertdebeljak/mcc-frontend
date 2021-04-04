import React from "react";
import styled from "styled-components";
import * as colors from "../colors";

const CustomTable = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  overflow-x: scroll;

  & tbody tr:nth-child(2n + 1) {
    background-color: ${colors.navyBlue}10;
  }

  @media screen and (max-width: 480px) {
    display: inline;
  }
`;

const Table: React.FC = ({children}) => {
  return <CustomTable>{children}</CustomTable>;
};

export default Table;
