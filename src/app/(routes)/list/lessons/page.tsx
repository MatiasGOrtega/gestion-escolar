import LessonItem from '@/components/list/listItems/LessonItem';
import PaginationList from '@/components/list/PaginationList';
import TableList from '@/components/list/TableList';
import TableTop from '@/components/list/TableTop';
import { lessonsData } from '@/constants/data';

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
    header: "Actions",
    accessor: "action",
  },
];

function Page() {
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop nameTable="All Lessons" />

      <TableList
        nameTable="A list of lessons"
        columns={columns}
        data={lessonsData}
        item={LessonItem}
      />

      <PaginationList />
    </div>
  )
}

export default Page