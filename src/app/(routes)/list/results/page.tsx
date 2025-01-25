import { getResults } from '@/actions/result.action';
import ResultItem from '@/components/list/listItems/ResultItem';
import PaginationList from '@/components/list/PaginationList';
import TableList from '@/components/list/TableList';
import TableTop from '@/components/list/TableTop';

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getResults(props.searchParams);

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="result" nameTable="All Results" />

      <TableList
        nameTable="A list of results"
        columns={columns}
        data={data}
        item={ResultItem}
      />

      <PaginationList page={p} count={count}/>
    </div>
  )
}

export default Page