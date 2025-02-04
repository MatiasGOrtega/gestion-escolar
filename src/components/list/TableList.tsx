import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Columns = {
  header: string;
  accessor: string;
  className?: string;
}[];

function TableList({
  nameTable,
  columns,
  data,
  item
}: {
  nameTable: string;
  columns: Columns;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: ( item: any) => React.ReactNode;
}) {
  return (
    <Table>
      <TableCaption>{nameTable}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.header}
              className={`text-left text-gray-500 font-bold ${column.className}`}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((info) => item(info))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7} className="text-right">
            <span className="text-gray-500">Showing 1 to 10 </span>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default TableList;
