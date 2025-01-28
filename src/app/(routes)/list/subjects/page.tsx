import { getSubjects } from "@/actions/subject.actions";
import SubjectItem from "@/components/list/listItems/SubjectItem";
import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";
import { currentUser } from "@clerk/nextjs/server";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getSubjects(props.searchParams);
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Teachers",
      accessor: "teachers",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="subject" nameTable="All subjects" role={role} />

      <TableList
        nameTable="A list of subjects"
        columns={columns}
        data={data}
        item={SubjectItem}
      />

      <PaginationList page={p} count={count} />
    </div>
  );
}

export default Page;
