import AssignmentItem from '@/components/list/listItems/AssignmentItem';
import PaginationList from '@/components/list/PaginationList';
import TableList from '@/components/list/TableList';
import TableTop from '@/components/list/TableTop';
import { assignmentsData } from '@/constants/data';

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
  {
    header: "Actions",
    accessor: "action",
  },
];

function Page() {
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="assignment" nameTable="All Assignments" />

      <TableList
        nameTable="A list of assignments"
        columns={columns}
        data={assignmentsData}
        item={AssignmentItem}
      />

      <PaginationList />
    </div>
  )
}

export default Page