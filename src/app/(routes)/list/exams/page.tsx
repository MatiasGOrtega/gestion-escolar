import ExamItem from '@/components/list/listItems/ExamItem';
import PaginationList from '@/components/list/PaginationList';
import TableList from '@/components/list/TableList';
import TableTop from '@/components/list/TableTop';
import { examsData } from '@/constants/data';

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
  {
    header: "Actions",
    accessor: "action",
  },
];

function Page() {
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="exam" nameTable="All Exams" />

      <TableList
        nameTable="A list of examns"
        columns={columns}
        data={examsData}
        item={ExamItem}
      />

      <PaginationList />
    </div>
  )
}

export default Page