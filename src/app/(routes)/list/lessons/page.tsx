import { getLessons } from "@/actions/lesson.action";
import LessonItem from "@/components/list/listItems/LessonItem";
import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";
import { currentUser } from "@clerk/nextjs/server";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getLessons(props.searchParams);
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
      <TableTop table="lesson" nameTable="All Lessons" role={role} />

      <TableList
        nameTable="A list of lessons"
        columns={columns}
        data={data}
        item={LessonItem}
      />

      <PaginationList page={p} count={count} />
    </div>
  );
}

export default Page;
