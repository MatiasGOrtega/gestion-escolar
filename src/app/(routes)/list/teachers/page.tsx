import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import { teachersData } from "@/constants/data";
import TeacherItem from "@/components/list/listItems/TeacherItem";
import TableTop from "@/components/list/TableTop";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
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
      <TableTop table="teacher" nameTable="All Teachers" />

      <TableList
        nameTable="A list of teachers"
        columns={columns}
        data={teachersData}
        item={TeacherItem}
      />

      <PaginationList />
    </div>
  );
}

export default Page;
