import ClassItem from '@/components/list/listItems/ClassItem';
import PaginationList from '@/components/list/PaginationList';
import TableList from '@/components/list/TableList';
import TableTop from '@/components/list/TableTop';
import { classesData } from '@/constants/data';

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
  {
    header: "Actions",
    accessor: "action",
  },
];

function Page() {
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop nameTable="All Classes" />

      <TableList
        nameTable="A list of classes"
        columns={columns}
        data={classesData}
        item={ClassItem}
      />

      <PaginationList />
    </div>
  );
}

export default Page