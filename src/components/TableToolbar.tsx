import React, { Dispatch } from "react";
import Box from "./Box";
import Text from "./Text";
import BasicTextInput from "./BasicTextInput";

interface TableToolbarProps {
  filter: {
    limit: number;
    search: string;
  };
  onFilterChange: Dispatch<any>;
}

const selectOptions = [5, 10, 25, 50];

const TableToolbar: React.FC<TableToolbarProps> = ({filter, onFilterChange}) => {
  const handleFilterChange = (event: any) => {
    const { value, name: key } = event.target;
    onFilterChange({
      ...filter,
      [key]: value
    });
  };

  return (
    <Box flex justifyContent="space-between" alignItems="center" paddingBottom={20}>
      <Text>
        Show&nbsp;
        <select name="limit" value={filter.limit} onChange={handleFilterChange}>
          {selectOptions.map((option: number) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        &nbsp;entries
      </Text>
      <Text>
        Search:&nbsp;
        <BasicTextInput name="search" value={filter.search} onChange={handleFilterChange} />
      </Text>
    </Box>
  );
};

export default TableToolbar;
