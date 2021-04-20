import React from "react";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {SORT_ORDER} from "../interfaces";

export interface TableCellProps {
  width?: string;
  minWidth?: number;
  wrap?: boolean;
  align?: "left" | "right" | "center";
  field?: string;
  handleSorting?: (sortOrder: SORT_ORDER, field: string) => void;
  sortBy?: string;
  sortOrder?: SORT_ORDER;
}

const CustomTableCell = styled.td<TableCellProps>`
  padding: 10px;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  text-align: ${({ align }) => align};
  width: ${({ width }) => width};
  position: relative;
`;

const StyledIcon = styled.i`
  position: absolute;
  right: 0;
`;

const TableCell: React.FC<TableCellProps> = ({children, field, handleSorting, sortBy, sortOrder, ...props}) => {
  const handleClick = () => {
    if (handleSorting && field) {
      handleSorting(sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC, field);
    }
  };

  return (
    <CustomTableCell onClick={handleClick} style={{cursor: handleSorting ? "pointer" : "default"}} {...props}>
      {children}
      {handleSorting && field && (
        field === sortBy ? (
          <StyledIcon className={`fa ${sortOrder === SORT_ORDER.ASC ? "fa-sort-up" : "fa-sort-down"}`} style={{color: "#8C93FE"}} />
        ) : (
          <StyledIcon className="fa fa-sort" style={{color: "#DCDCDC"}} />
        )
      )}
    </CustomTableCell>
  );
};

export default TableCell;
