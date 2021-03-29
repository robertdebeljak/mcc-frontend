import React from "react";
import Card from "./Card";
import Table from "./Table";
import TableBody from "./TableBody";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import Text from "./Text";
import Box from "./Box";

interface ListViewProps {
  data: object[];
  header?: any;
  pending?: boolean;
  renderEmpty: any;
  columns?: any;
  renderItem: (data: any, index: number) => JSX.Element;
}

const ListView = ({data, renderItem, header, columns, renderEmpty}: ListViewProps) => {
  return (
    <Card>
      {header}
      {
        <Table>
          {
            columns &&
            <TableHead>
              {columns.map((column: any, index: number) =>
                <TableCell key={index} width={column.width}>
                  <Box padding={8}><Text weight="600">{column.title}</Text></Box>
                </TableCell>)
              }
            </TableHead>
          }
          <TableBody>
            {
              data ? data.map((item, index) => renderItem(item, index)) : renderEmpty() as any
            }
          </TableBody>
        </Table>
      }
    </Card>
  );
};

export default ListView;