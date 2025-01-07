import SubjectItem from '@/components/list/listItems/SubjectItem';
import PaginationList from '@/components/list/PaginationList';
import TableList from '@/components/list/TableList';
import TableTop from '@/components/list/TableTop';
import { subjectsData } from '@/constants/data';


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

function Page() {
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop nameTable="All subjects" />

      <TableList
        nameTable="A list of subjects"
        columns={columns}
        data={subjectsData}
        item={SubjectItem}
      />

      <PaginationList />
    </div>
  );
}

export default Page