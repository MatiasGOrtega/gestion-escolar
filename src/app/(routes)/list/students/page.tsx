import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";
import StudentItem from "@/components/list/listItems/StudentItem";
import { getStudents } from "@/actions/student.action";

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

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getStudents(props.searchParams);
  
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="student" nameTable="All students" />

      <TableList
        nameTable="A list of students"
        columns={columns}
        data={data}
        item={StudentItem}
      />

      <PaginationList page={p} count={count} />
    </div>
  );
}

export default Page;
