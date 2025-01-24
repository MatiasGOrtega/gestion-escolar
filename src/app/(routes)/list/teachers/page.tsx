import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TeacherItem from "@/components/list/listItems/TeacherItem";
import TableTop from "@/components/list/TableTop";
import { getTeachers } from "@/actions/teacher.action";

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

type SearchParams = Promise<{ [key: string]: string | undefined }>

async function Page(props: {searchParams: SearchParams}) {
  const { data, count, p } = await getTeachers(props.searchParams);
  
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="teacher" nameTable="All Teachers" />

      <TableList
        nameTable="A list of teachers"
        columns={columns}
        data={data}
        item={TeacherItem}
      />

      <PaginationList page={p} count={count}/>
    </div>
  );
}

export default Page;
