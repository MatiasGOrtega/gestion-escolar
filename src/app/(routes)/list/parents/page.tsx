import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import { parentsData } from "@/constants/data";
import TableTop from "@/components/list/TableTop";
import ParentItem from "@/components/list/listItems/ParentItem";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student Names",
    accessor: "students",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

function Page() {
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop nameTable="All parents" />

      <TableList
        nameTable="A list of parents"
        columns={columns}
        data={parentsData}
        item={ParentItem}
      />

      <PaginationList />
    </div>
  );
}

export default Page;