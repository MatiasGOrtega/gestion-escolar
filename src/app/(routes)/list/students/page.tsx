import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import { studentsData } from "@/constants/data";
import TableTop from "@/components/list/TableTop";
import StudentItem from "@/components/list/listItems/StudentItem";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
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
      <TableTop nameTable="All students" />

      <TableList
        nameTable="A list of students"
        columns={columns}
        data={studentsData}
        item={StudentItem}
      />

      <PaginationList />
    </div>
  );
}

export default Page;