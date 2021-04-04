import React, { Dispatch } from "react";
import styled from "styled-components";
import { Search } from "react-feather";

import Box from "./Box";
import BasicTextInput from "./BasicTextInput";
import BasicSelect from "./BasicSelect";
import * as colors from "../colors";

interface TableToolbarProps {
  filter: {
    limit: number;
    search: string;
    offset: number;
  };
  onFilterChange: Dispatch<any>;
}

const selectOptions = [5, 10, 25, 50];

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
`;

const TableToolbar: React.FC<TableToolbarProps> = ({filter, onFilterChange}) => {
  const handleFilterChange = (event: any) => {
    const { value, name: key } = event.target;
    onFilterChange({
      ...filter,
      [key]: value,
      offset: key === "limit" ? 0 : filter.offset
    });
  };

  return (
    <Box flex justifyContent="space-between" alignItems="center" paddingBottom={20}>
      <BasicSelect name="limit" value={filter.limit} onChange={handleFilterChange}>
        {selectOptions.map((option: number) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </BasicSelect>
      <Box position="relative">
        <BasicTextInput name="search" value={filter.search} onChange={handleFilterChange} placeholder="Search" icon />
        <SearchIcon color={colors.darkerGrey} width={18} />
      </Box>
    </Box>
  );
};

export default TableToolbar;
