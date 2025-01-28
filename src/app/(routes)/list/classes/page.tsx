import { getClasses } from "@/actions/class.action";
import ClassItem from "@/components/list/listItems/ClassItem";
import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";
import { currentUser } from "@clerk/nextjs/server";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getClasses(props.searchParams);
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
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
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="class" nameTable="All Classes" role={role} />

      <TableList
        nameTable="A list of classes"
        columns={columns}
        data={data}
        item={ClassItem}
      />

      <PaginationList page={p} count={count} />
    </div>
  );
}

export default Page;
