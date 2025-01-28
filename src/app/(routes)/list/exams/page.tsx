import { getExams } from "@/actions/exam.action";
import ExamItem from "@/components/list/listItems/ExamItem";
import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";
import { currentUser } from "@clerk/nextjs/server";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getExams(props.searchParams);
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
      header: "Date",
      accessor: "date",
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
      <TableTop table="exam" nameTable="All Exams" role={role} />

      <TableList
        nameTable="A list of examns"
        columns={columns}
        data={data}
        item={ExamItem}
      />

      <PaginationList page={p} count={count} />
    </div>
  );
}

export default Page;
