import React, {Dispatch} from "react";

import Box from "./Box";
import Text from "./Text";
import Button from "./Button";

interface ITablePaginationProps {
  filter: {
    offset: number;
    limit: number;
  };
  totalCount: number;
  onFilterChange: Dispatch<any>;
}

const TablePagination: React.FC<ITablePaginationProps> = ({ filter, onFilterChange, totalCount }) => {
  const from = filter.limit * filter.offset + 1;
  const to = filter.limit * (filter.offset + 1) < totalCount ? filter.limit * (filter.offset + 1) : totalCount;
  const totalPage = Math.ceil(totalCount / filter.limit);

  const handleChangePage = (page: number) => {
    onFilterChange({
      ...filter,
      offset: page
    });
  };

  const getStartButtonIndex = () => {
    if (totalPage < 5) return 0;
    if (filter.offset < 2) return 0;
    if (filter.offset > totalPage - 3) return totalPage - 5;
    return filter.offset - 2;
  };

  return (
    <Box flex justifyContent="space-between">
      <Text>
        {`Showing ${from} to ${to} of ${totalCount} entries`}
      </Text>
      <Box flex>
        <Button
          disabled={filter.offset === 0}
          onClick={() => handleChangePage(0)}>
          First
        </Button>
        <Button
          disabled={filter.offset === 0}
          onClick={() => handleChangePage(filter.offset - 1)}>
          Previous
        </Button>
        {new Array(totalPage < 5 ? totalPage : 5).fill(0).map((_, index: number) => (
          <Button
            active={filter.offset === getStartButtonIndex() + index}
            onClick={() => handleChangePage(getStartButtonIndex() + index)}>
            {getStartButtonIndex() + index + 1}
          </Button>
        ))}
        <Button
          disabled={filter.offset === totalPage - 1}
          onClick={() => handleChangePage(filter.offset + 1)}>
          Next
        </Button>
        <Button
          disabled={filter.offset === totalPage - 1}
          onClick={() => handleChangePage(totalPage - 1)}>
          Last
        </Button>
      </Box>
    </Box>
  );
};

export default TablePagination;
