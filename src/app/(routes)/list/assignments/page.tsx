import { getAssignments } from "@/actions/assignment.action";
import AssignmentItem from "@/components/list/listItems/AssignmentItem";
import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";
import { currentUser } from "@clerk/nextjs/server";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getAssignments(props.searchParams);
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
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
      <TableTop table="assignment" nameTable="All Assignments" role={role} />

      <TableList
        nameTable="A list of assignments"
        columns={columns}
        data={data}
        item={AssignmentItem}
      />

      <PaginationList page={p} count={count} />
    </div>
  );
}

export default Page;
