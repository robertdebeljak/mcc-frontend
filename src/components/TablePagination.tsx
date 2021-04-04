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

const CONTROL_COUNT = 3;

const TablePagination: React.FC<ITablePaginationProps> = ({ filter, onFilterChange, totalCount }) => {
  const from = filter.limit * filter.offset + (totalCount > 0 ? 1 : 0);
  const to = filter.limit * (filter.offset + 1) < totalCount ? filter.limit * (filter.offset + 1) : totalCount;
  const totalPage = Math.ceil(totalCount / filter.limit);

  const handleChangePage = (page: number) => {
    onFilterChange({
      ...filter,
      offset: page
    });
  };

  const getStartButtonIndex = () => {
    if (totalPage < CONTROL_COUNT) return 0;
    if (filter.offset < Math.floor(CONTROL_COUNT / 2)) return 0;
    if (filter.offset > totalPage - Math.floor(CONTROL_COUNT / 2 + 1)) return totalPage - CONTROL_COUNT;
    return filter.offset - Math.floor(CONTROL_COUNT / 2);
  };

  return (
    <Box flex justifyContent="space-between" flexWrap="wrap">
      <Text>
        {`Showing ${from} to ${to} of ${totalCount} entries`}
      </Text>
      {totalCount > 0 && (
        <Box flex marginTop={20} style={{ marginLeft: "auto" }}>
          <Button
            disabled={filter.offset === 0}
            onClick={() => handleChangePage(0)}>
            {"«"}
          </Button>
          <Button
            disabled={filter.offset === 0}
            onClick={() => handleChangePage(filter.offset - 1)}>
            {"‹"}
          </Button>
          {new Array(totalPage < CONTROL_COUNT ? totalPage : CONTROL_COUNT).fill(0).map((_, index: number) => (
            <Button
              key={index}
              active={filter.offset === getStartButtonIndex() + index}
              onClick={() => handleChangePage(getStartButtonIndex() + index)}>
              {getStartButtonIndex() + index + 1}
            </Button>
          ))}
          <Button
            disabled={filter.offset === totalPage - 1}
            onClick={() => handleChangePage(filter.offset + 1)}>
            {"›"}
          </Button>
          <Button
            disabled={filter.offset === totalPage - 1}
            onClick={() => handleChangePage(totalPage - 1)}>
            {"»"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TablePagination;
