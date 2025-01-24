import { getSubjects } from "@/actions/subject.actions";
import SubjectItem from "@/components/list/listItems/SubjectItem";
import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";

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

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getSubjects(props.searchParams);

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="subject" nameTable="All subjects" />

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
