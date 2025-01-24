import { getClasses } from "@/actions/class.action";
import ClassItem from "@/components/list/listItems/ClassItem";
import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getClasses(props.searchParams);

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="class" nameTable="All Classes" />

      <TableList
        nameTable="A list of classes"
        columns={columns}
        data={data}
        item={ClassItem}
      />

      <PaginationList page={p} count={count}/>
    </div>
  );
}

export default Page;
